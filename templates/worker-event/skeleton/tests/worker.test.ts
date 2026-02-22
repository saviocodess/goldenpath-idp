import { metricsAsPrometheus, resetMetrics } from '../src/metrics';
import { calculateBackoffMs, dlqSnapshot, processWithRetry, resetDlq } from '../src/worker';

describe('backoff strategy', () => {
  it('uses exponential backoff based on attempt', () => {
    const first = calculateBackoffMs(1, { baseBackoffMs: 100, jitterRatio: 0 });
    const second = calculateBackoffMs(2, { baseBackoffMs: 100, jitterRatio: 0 });
    const capped = calculateBackoffMs(10, { baseBackoffMs: 100, maxBackoffMs: 1000, jitterRatio: 0 });

    expect(first).toBe(100);
    expect(second).toBe(200);
    expect(capped).toBe(1000);
  });
});

describe('metrics output', () => {
  beforeEach(() => {
    resetMetrics();
  });

  it('exports known metric names', () => {
    const output = metricsAsPrometheus();
    expect(output).toContain('worker_attempt_total');
    expect(output).toContain('worker_processed_total');
    expect(output).toContain('worker_failed_total');
    expect(output).toContain('worker_retried_total');
    expect(output).toContain('worker_dlq_total');
  });
});

describe('processWithRetry', () => {
  beforeEach(() => {
    resetMetrics();
    resetDlq();
  });

  it('moves message to DLQ after max retries', async () => {
    const fakeLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      fatal: jest.fn()
    } as any;

    const result = await processWithRetry(
      {
        id: 'evt-test',
        eventType: 'order.failed',
        payload: { shouldFail: true }
      },
      {
        logger: fakeLogger,
        maxRetries: 2,
        sleepFn: async () => undefined,
        processMessageFn: async () => {
          throw new Error('boom');
        },
        baseBackoffMs: 10,
        maxBackoffMs: 20,
        backoffJitterRatio: 0
      }
    );

    expect(result.status).toBe('dlq');
    expect(result.attempts).toBe(2);
    expect(dlqSnapshot()).toHaveLength(1);
    expect(fakeLogger.warn).toHaveBeenCalled();
    expect(fakeLogger.error).toHaveBeenCalled();
  });
});

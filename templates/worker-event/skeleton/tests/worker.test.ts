import { calculateBackoffMs } from '../src/worker';
import { metricsAsPrometheus } from '../src/metrics';

describe('backoff strategy', () => {
  it('uses exponential backoff based on attempt', () => {
    expect(calculateBackoffMs(1)).toBeGreaterThan(0);
    expect(calculateBackoffMs(2)).toBeGreaterThan(calculateBackoffMs(1));
  });
});

describe('metrics output', () => {
  it('exports known metric names', () => {
    const output = metricsAsPrometheus();
    expect(output).toContain('worker_processed_total');
    expect(output).toContain('worker_failed_total');
    expect(output).toContain('worker_retried_total');
    expect(output).toContain('worker_dlq_total');
  });
});

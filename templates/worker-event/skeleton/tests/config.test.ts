import { loadConfig } from '../src/config';

describe('worker loadConfig', () => {
  it('loads defaults', () => {
    const config = loadConfig({});
    expect(config.maxRetries).toBe(3);
    expect(config.baseBackoffMs).toBe(250);
    expect(config.maxBackoffMs).toBe(5000);
    expect(config.metricsPort).toBeUndefined();
  });

  it('parses configured values', () => {
    const config = loadConfig({
      MAX_RETRIES: '5',
      BASE_BACKOFF_MS: '100',
      MAX_BACKOFF_MS: '2000',
      BACKOFF_JITTER_RATIO: '0.2',
      PROCESS_DELAY_MS: '10',
      METRICS_PORT: '9464'
    });

    expect(config.maxRetries).toBe(5);
    expect(config.baseBackoffMs).toBe(100);
    expect(config.maxBackoffMs).toBe(2000);
    expect(config.backoffJitterRatio).toBe(0.2);
    expect(config.processDelayMs).toBe(10);
    expect(config.metricsPort).toBe(9464);
  });

  it('throws on invalid numeric configuration', () => {
    expect(() => loadConfig({ MAX_RETRIES: '0' })).toThrow(/MAX_RETRIES/);
  });
});

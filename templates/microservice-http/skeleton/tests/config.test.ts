import { loadConfig } from '../src/config';

describe('loadConfig', () => {
  it('loads defaults when env is empty', () => {
    const config = loadConfig({});
    expect(config.port).toBe(3000);
    expect(config.requestTimeoutMs).toBe(30000);
    expect(config.headersTimeoutMs).toBe(35000);
    expect(config.gracefulShutdownTimeoutMs).toBe(10000);
    expect(config.serviceName).toBe('microservice-http');
  });

  it('parses numeric env values', () => {
    const config = loadConfig({
      PORT: '8080',
      REQUEST_TIMEOUT_MS: '45000',
      HEADERS_TIMEOUT_MS: '47000',
      GRACEFUL_SHUTDOWN_TIMEOUT_MS: '12000'
    });

    expect(config.port).toBe(8080);
    expect(config.requestTimeoutMs).toBe(45000);
    expect(config.headersTimeoutMs).toBe(47000);
    expect(config.gracefulShutdownTimeoutMs).toBe(12000);
  });

  it('throws for invalid integer env values', () => {
    expect(() => loadConfig({ PORT: 'abc' })).toThrow(/PORT/);
  });
});

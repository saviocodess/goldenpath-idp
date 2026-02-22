import { getHealth, getReadiness } from '../src/health';

describe('health contracts', () => {
  it('returns healthy status', () => {
    const health = getHealth({ serviceName: 'svc', environment: 'test', version: '1.2.3' });
    expect(health.status).toBe('ok');
    expect(health.service).toBe('svc');
    expect(health.environment).toBe('test');
    expect(health.version).toBe('1.2.3');
  });

  it('returns readiness shape', () => {
    const ready = getReadiness({ configLoaded: true, telemetryBootstrapped: true });
    expect(ready.status).toBe('ready');
    expect(ready.checks.telemetry_bootstrapped).toBe(true);
  });

  it('returns not_ready when config is missing', () => {
    const readiness = getReadiness({ configLoaded: false, telemetryBootstrapped: false });
    expect(readiness.status).toBe('not_ready');
    expect(readiness.checks.config_loaded).toBe(false);
  });
});

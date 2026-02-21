import { getHealth, getReadiness } from '../src/health';

describe('health contracts', () => {
  it('returns healthy status', () => {
    expect(getHealth().status).toBe('ok');
  });

  it('returns readiness shape', () => {
    const ready = getReadiness();
    expect(['ready', 'not_ready']).toContain(ready.status);
  });
});

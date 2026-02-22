export type WorkerConfig = {
  serviceName: string;
  environment: string;
  logLevel: string;
  maxRetries: number;
  baseBackoffMs: number;
  maxBackoffMs: number;
  backoffJitterRatio: number;
  processDelayMs: number;
  metricsPort?: number;
};

type NumberOptions = {
  min?: number;
};

function parseIntegerEnv(name: string, fallback: number, env: NodeJS.ProcessEnv, options: NumberOptions = {}): number {
  const raw = env[name];
  if (raw === undefined || raw === '') {
    return fallback;
  }

  const parsed = Number(raw);
  if (!Number.isInteger(parsed)) {
    throw new Error(`Invalid integer for ${name}: ${raw}`);
  }

  if (options.min !== undefined && parsed < options.min) {
    throw new Error(`Invalid value for ${name}: expected >= ${options.min}, got ${parsed}`);
  }

  return parsed;
}

function parseFloatEnv(name: string, fallback: number, env: NodeJS.ProcessEnv, options: NumberOptions = {}): number {
  const raw = env[name];
  if (raw === undefined || raw === '') {
    return fallback;
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid number for ${name}: ${raw}`);
  }

  if (options.min !== undefined && parsed < options.min) {
    throw new Error(`Invalid value for ${name}: expected >= ${options.min}, got ${parsed}`);
  }

  return parsed;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): WorkerConfig {
  const metricsPortRaw = env.METRICS_PORT?.trim();

  return {
    serviceName: env.SERVICE_NAME?.trim() || 'worker-event',
    environment: env.NODE_ENV?.trim() || 'development',
    logLevel: env.LOG_LEVEL?.trim() || 'info',
    maxRetries: parseIntegerEnv('MAX_RETRIES', 3, env, { min: 1 }),
    baseBackoffMs: parseIntegerEnv('BASE_BACKOFF_MS', 250, env, { min: 1 }),
    maxBackoffMs: parseIntegerEnv('MAX_BACKOFF_MS', 5000, env, { min: 1 }),
    backoffJitterRatio: parseFloatEnv('BACKOFF_JITTER_RATIO', 0.1, env, { min: 0 }),
    processDelayMs: parseIntegerEnv('PROCESS_DELAY_MS', 50, env, { min: 0 }),
    metricsPort: metricsPortRaw ? parseIntegerEnv('METRICS_PORT', 9464, env, { min: 1 }) : undefined
  };
}

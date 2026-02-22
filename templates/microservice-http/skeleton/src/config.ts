export type ServiceConfig = {
  serviceName: string;
  environment: string;
  port: number;
  requestBodyLimit: string;
  requestTimeoutMs: number;
  headersTimeoutMs: number;
  gracefulShutdownTimeoutMs: number;
};

type IntOptions = {
  min?: number;
};

function parseIntEnv(name: string, fallback: number, env: NodeJS.ProcessEnv, options: IntOptions = {}): number {
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

export function loadConfig(env: NodeJS.ProcessEnv = process.env): ServiceConfig {
  const serviceName = env.SERVICE_NAME?.trim() || 'microservice-http';
  const environment = env.NODE_ENV?.trim() || 'development';

  return {
    serviceName,
    environment,
    port: parseIntEnv('PORT', 3000, env, { min: 1 }),
    requestBodyLimit: env.REQUEST_BODY_LIMIT?.trim() || '1mb',
    requestTimeoutMs: parseIntEnv('REQUEST_TIMEOUT_MS', 30000, env, { min: 1000 }),
    headersTimeoutMs: parseIntEnv('HEADERS_TIMEOUT_MS', 35000, env, { min: 1000 }),
    gracefulShutdownTimeoutMs: parseIntEnv('GRACEFUL_SHUTDOWN_TIMEOUT_MS', 10000, env, { min: 1000 })
  };
}

export type HealthStatus = {
  status: 'ok';
  service: string;
  environment: string;
  version: string;
  uptime_seconds: number;
  timestamp: string;
};

export type ReadinessStatus = {
  status: 'ready' | 'not_ready';
  checks: {
    config_loaded: boolean;
    telemetry_bootstrapped: boolean;
  };
};

export type HealthOptions = {
  serviceName?: string;
  environment?: string;
  version?: string;
};

export type ReadinessOptions = {
  configLoaded?: boolean;
  telemetryBootstrapped?: boolean;
};

export function getHealth(options: HealthOptions = {}): HealthStatus {
  return {
    status: 'ok',
    service: options.serviceName || process.env.SERVICE_NAME || 'microservice-http',
    environment: options.environment || process.env.NODE_ENV || 'development',
    version: options.version || process.env.APP_VERSION || '0.1.0',
    uptime_seconds: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString()
  };
}

export function getReadiness(options: ReadinessOptions = {}): ReadinessStatus {
  const configLoaded = options.configLoaded ?? Boolean(process.env.SERVICE_NAME?.trim());
  const telemetryBootstrapped = options.telemetryBootstrapped ?? false;

  return {
    status: configLoaded ? 'ready' : 'not_ready',
    checks: {
      config_loaded: configLoaded,
      telemetry_bootstrapped: telemetryBootstrapped
    }
  };
}

export type HealthStatus = {
  status: 'ok';
  uptime_seconds: number;
  timestamp: string;
};

export type ReadinessStatus = {
  status: 'ready' | 'not_ready';
  checks: {
    config_loaded: boolean;
  };
};

export function getHealth(): HealthStatus {
  return {
    status: 'ok',
    uptime_seconds: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString()
  };
}

export function getReadiness(): ReadinessStatus {
  const configLoaded = Boolean(process.env.SERVICE_NAME || 'microservice-http');
  return {
    status: configLoaded ? 'ready' : 'not_ready',
    checks: {
      config_loaded: configLoaded
    }
  };
}

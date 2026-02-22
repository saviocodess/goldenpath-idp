import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { logger } from './logger';

let initialized = false;

export function isTelemetryBootstrapped(): boolean {
  return initialized;
}

export function bootstrapTelemetry(serviceName = process.env.SERVICE_NAME || 'worker-event'): void {
  if (initialized) {
    return;
  }

  if (process.env.OTEL_DEBUG === 'true') {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
  }

  logger.info(
    {
      otel_service_name: process.env.OTEL_SERVICE_NAME || serviceName,
      otel_endpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'not-configured',
      otel_sampler: process.env.OTEL_TRACES_SAMPLER || 'default'
    },
    'telemetry bootstrap executed'
  );

  initialized = true;
}

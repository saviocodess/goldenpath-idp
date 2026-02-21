import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { logger } from './logger';

let initialized = false;

export function bootstrapTelemetry(): void {
  if (initialized) {
    return;
  }

  if (process.env.OTEL_DEBUG === 'true') {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
  }

  logger.info(
    {
      otel_service_name: process.env.OTEL_SERVICE_NAME || process.env.SERVICE_NAME || 'worker-event',
      otel_endpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'not-configured'
    },
    'bootstrap de telemetria executado'
  );

  initialized = true;
}

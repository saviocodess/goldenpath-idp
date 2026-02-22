import pino, { type Logger } from 'pino';

export type LoggerOptions = {
  serviceName?: string;
  environment?: string;
  level?: string;
};

export function createLogger(options: LoggerOptions = {}): Logger {
  return pino({
    level: options.level || process.env.LOG_LEVEL || 'info',
    base: {
      service: options.serviceName || process.env.SERVICE_NAME || 'worker-event',
      environment: options.environment || process.env.NODE_ENV || 'development'
    },
    timestamp: pino.stdTimeFunctions.isoTime
  });
}

export const logger = createLogger();

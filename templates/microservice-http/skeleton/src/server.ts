import http, { type Server } from 'node:http';
import type { Express } from 'express';
import { createApp } from './app';
import { loadConfig, type ServiceConfig } from './config';
import { createLogger, type LoggerOptions } from './logger';
import { bootstrapTelemetry } from './otel';

export type RunningServer = {
  app: Express;
  server: Server;
  config: ServiceConfig;
  loggerOptions: LoggerOptions;
};

export function buildServer(env: NodeJS.ProcessEnv = process.env): RunningServer {
  const config = loadConfig(env);
  const loggerOptions: LoggerOptions = {
    serviceName: config.serviceName,
    environment: config.environment
  };

  bootstrapTelemetry(config.serviceName);
  const appLogger = createLogger(loggerOptions);
  const app = createApp(config, appLogger);
  const server = http.createServer(app);

  server.requestTimeout = config.requestTimeoutMs;
  server.headersTimeout = config.headersTimeoutMs;

  return {
    app,
    server,
    config,
    loggerOptions
  };
}

function startMainProcess(): void {
  const { server, config, loggerOptions } = buildServer();
  const logger = createLogger(loggerOptions);

  server.listen(config.port, () => {
    logger.info(
      {
        port: config.port,
        request_timeout_ms: config.requestTimeoutMs,
        headers_timeout_ms: config.headersTimeoutMs
      },
      'microservice-http started'
    );
  });

  let shuttingDown = false;
  const shutdown = (signal: string) => {
    if (shuttingDown) {
      return;
    }
    shuttingDown = true;

    logger.info({ signal }, 'shutdown signal received');
    const forceExit = setTimeout(() => {
      logger.error({ timeout_ms: config.gracefulShutdownTimeoutMs }, 'graceful shutdown timeout exceeded');
      process.exit(1);
    }, config.gracefulShutdownTimeoutMs);
    forceExit.unref();

    server.close((error) => {
      clearTimeout(forceExit);
      if (error) {
        logger.error({ err: error }, 'server shutdown failed');
        process.exit(1);
      }
      logger.info('shutdown completed');
      process.exit(0);
    });
  };

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));
  process.once('unhandledRejection', (error) => {
    logger.error({ err: error }, 'unhandled rejection');
    shutdown('unhandledRejection');
  });
  process.once('uncaughtException', (error) => {
    logger.fatal({ err: error }, 'uncaught exception');
    shutdown('uncaughtException');
  });
}

if (require.main === module) {
  startMainProcess();
}

export { createApp };

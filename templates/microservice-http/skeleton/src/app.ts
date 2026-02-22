import { randomUUID } from 'node:crypto';
import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import { trace } from '@opentelemetry/api';
import pinoHttp from 'pino-http';
import type { Logger } from 'pino';
import type { ServiceConfig } from './config';
import { getHealth, getReadiness } from './health';
import { isTelemetryBootstrapped } from './otel';

declare module 'express-serve-static-core' {
  interface Request {
    requestId: string;
  }
}

export function createApp(config: ServiceConfig, appLogger: Logger): Express {
  const app = express();
  const tracer = trace.getTracer(config.serviceName);

  app.disable('x-powered-by');
  app.use(express.json({ limit: config.requestBodyLimit }));

  app.use((req: Request, res: Response, next: NextFunction) => {
    const incoming = req.header('x-request-id');
    req.requestId = incoming || randomUUID();
    res.setHeader('x-request-id', req.requestId);
    next();
  });

  app.use(
    pinoHttp({
      logger: appLogger,
      customProps: (req) => {
        const typedReq = req as Request;
        return { request_id: typedReq.requestId };
      },
      customLogLevel: (_req, res, error) => {
        if (error || res.statusCode >= 500) {
          return 'error';
        }
        if (res.statusCode >= 400) {
          return 'warn';
        }
        return 'info';
      }
    })
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    const span = tracer.startSpan(`http.${req.method.toLowerCase()}`);
    span.setAttribute('http.method', req.method);
    span.setAttribute('http.route', req.path);
    span.setAttribute('request.id', req.requestId);

    let closed = false;
    const finalizeSpan = () => {
      if (closed) {
        return;
      }
      closed = true;
      span.setAttribute('http.status_code', res.statusCode);
      span.end();
    };

    res.once('finish', finalizeSpan);
    res.once('close', finalizeSpan);
    next();
  });

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json(
      getHealth({
        serviceName: config.serviceName,
        environment: config.environment,
        version: process.env.APP_VERSION || '0.1.0'
      })
    );
  });

  app.get('/ready', (_req: Request, res: Response) => {
    const readiness = getReadiness({
      configLoaded: Boolean(config.serviceName),
      telemetryBootstrapped: isTelemetryBootstrapped()
    });

    res.status(readiness.status === 'ready' ? 200 : 503).json(readiness);
  });

  app.get('/', (req: Request, res: Response) => {
    appLogger.info({ request_id: req.requestId }, 'incoming root request');
    res.status(200).json({
      service: config.serviceName,
      environment: config.environment,
      request_id: req.requestId
    });
  });

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      status: 'not_found',
      request_id: req.requestId,
      path: req.path
    });
  });

  app.use((error: unknown, req: Request, res: Response, _next: NextFunction) => {
    appLogger.error(
      {
        request_id: req.requestId,
        err: error
      },
      'unhandled request error'
    );

    if (res.headersSent) {
      return;
    }

    res.status(500).json({
      status: 'internal_error',
      request_id: req.requestId
    });
  });

  return app;
}

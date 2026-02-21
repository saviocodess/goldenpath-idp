import { randomUUID } from 'node:crypto';
import express, { NextFunction, Request, Response } from 'express';
import pinoHttp from 'pino-http';
import { trace } from '@opentelemetry/api';
import { getHealth, getReadiness } from './health';
import { logger } from './logger';
import { bootstrapTelemetry } from './otel';

declare module 'express-serve-static-core' {
  interface Request {
    requestId: string;
  }
}

const tracer = trace.getTracer('microservice-http');
const app = express();
bootstrapTelemetry();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const incoming = req.header('x-request-id');
  req.requestId = incoming || randomUUID();
  res.setHeader('x-request-id', req.requestId);
  next();
});

app.use(
  pinoHttp({
    logger,
    customProps: (req) => ({
      request_id: req.requestId
    })
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  const span = tracer.startSpan(`http.${req.method.toLowerCase()}`);
  span.setAttribute('http.route', req.path);
  span.setAttribute('request.id', req.requestId);
  res.on('finish', () => {
    span.setAttribute('http.status_code', res.statusCode);
    span.end();
  });
  next();
});

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json(getHealth());
});

app.get('/ready', (_req: Request, res: Response) => {
  const readiness = getReadiness();
  res.status(readiness.status === 'ready' ? 200 : 503).json(readiness);
});

app.get('/', (req: Request, res: Response) => {
  logger.info({ request_id: req.requestId }, 'request recebida');
  res.status(200).json({
    service: process.env.SERVICE_NAME || 'microservice-http',
    request_id: req.requestId
  });
});

const port = Number(process.env.PORT || 3000);

if (require.main === module) {
  const server = app.listen(port, () => {
    logger.info({ port }, 'microservice-http iniciado');
  });

  const shutdown = (signal: string) => {
    logger.info({ signal }, 'recebido sinal de shutdown');
    server.close((error) => {
      if (error) {
        logger.error({ err: error }, 'erro no shutdown do servidor');
        process.exit(1);
      }
      logger.info('shutdown concluído');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

export { app };

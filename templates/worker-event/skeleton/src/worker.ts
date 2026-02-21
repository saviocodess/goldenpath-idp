import { trace } from '@opentelemetry/api';
import { incMetric, metricsSnapshot, startMetricsServer } from './metrics';
import { logger } from './logger';
import { bootstrapTelemetry } from './otel';

export type QueueMessage = {
  id: string;
  eventType: string;
  payload: Record<string, unknown>;
};

const tracer = trace.getTracer('worker-event');
const maxRetries = Number(process.env.MAX_RETRIES || 3);
const baseBackoffMs = Number(process.env.BASE_BACKOFF_MS || 250);

const queue: QueueMessage[] = [
  { id: 'evt-001', eventType: 'order.created', payload: { orderId: 'o-1' } },
  { id: 'evt-002', eventType: 'order.failed', payload: { orderId: 'o-2', shouldFail: true } },
  { id: 'evt-003', eventType: 'order.shipped', payload: { orderId: 'o-3' } }
];

const deadLetterQueue: QueueMessage[] = [];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calculateBackoffMs(attempt: number): number {
  return baseBackoffMs * 2 ** Math.max(0, attempt - 1);
}

async function processMessage(message: QueueMessage): Promise<void> {
  const span = tracer.startSpan('worker.process_message');
  span.setAttribute('messaging.message_id', message.id);
  span.setAttribute('messaging.destination_kind', 'queue');

  try {
    const shouldFail = Boolean(message.payload.shouldFail);
    if (shouldFail) {
      throw new Error('falha simulada de processamento');
    }

    await sleep(50);
    incMetric('worker_processed_total');
    logger.info({ message_id: message.id, event_type: message.eventType }, 'mensagem processada');
  } catch (error) {
    incMetric('worker_failed_total');
    throw error;
  } finally {
    span.end();
  }
}

async function sendToDlq(message: QueueMessage, reason: string): Promise<void> {
  deadLetterQueue.push(message);
  incMetric('worker_dlq_total');

  // Stub: substituir por integração real com DLQ do provedor de mensageria.
  logger.error({ message_id: message.id, reason }, 'mensagem enviada para DLQ');
}

export async function processWithRetry(message: QueueMessage): Promise<void> {
  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      await processMessage(message);
      return;
    } catch (error) {
      if (attempt === maxRetries) {
        await sendToDlq(message, (error as Error).message);
        return;
      }

      const backoff = calculateBackoffMs(attempt);
      incMetric('worker_retried_total');
      logger.warn(
        {
          message_id: message.id,
          attempt,
          backoff_ms: backoff,
          error: (error as Error).message
        },
        'falha ao processar mensagem, aplicando retry'
      );
      await sleep(backoff);
    }
  }
}

async function consumeLoop(): Promise<void> {
  logger.info({ queue_size: queue.length }, 'iniciando loop de consumo');
  for (const message of queue) {
    await processWithRetry(message);
  }

  logger.info({ metrics: metricsSnapshot(), dlq_size: deadLetterQueue.length }, 'consumo finalizado');
}

async function main(): Promise<void> {
  bootstrapTelemetry();

  const metricsPort = process.env.METRICS_PORT ? Number(process.env.METRICS_PORT) : undefined;
  if (metricsPort) {
    startMetricsServer(metricsPort);
    logger.info({ metrics_port: metricsPort, metrics_path: '/metrics' }, 'endpoint de métricas habilitado');
  }

  await consumeLoop();
}

if (require.main === module) {
  main().catch((error) => {
    logger.fatal({ err: error }, 'worker finalizado com erro fatal');
    process.exit(1);
  });
}

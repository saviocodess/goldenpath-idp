import type { Server } from 'node:http';
import { trace } from '@opentelemetry/api';
import type { Logger } from 'pino';
import { loadConfig, type WorkerConfig } from './config';
import { createLogger } from './logger';
import { incMetric, metricsSnapshot, resetMetrics, startMetricsServer } from './metrics';
import { bootstrapTelemetry } from './otel';

export type QueueMessage = {
  id: string;
  eventType: string;
  payload: Record<string, unknown>;
};

export type DlqRecord = {
  message_id: string;
  event_type: string;
  reason: string;
  failed_at: string;
};

export type BackoffOptions = {
  baseBackoffMs?: number;
  maxBackoffMs?: number;
  jitterRatio?: number;
  random?: () => number;
};

export type ProcessWithRetryOptions = {
  logger?: Logger;
  sleepFn?: (ms: number) => Promise<void>;
  processMessageFn?: (message: QueueMessage, attempt: number) => Promise<void>;
  maxRetries?: number;
  baseBackoffMs?: number;
  maxBackoffMs?: number;
  backoffJitterRatio?: number;
  random?: () => number;
  now?: () => Date;
  processDelayMs?: number;
};

export type ProcessResult = {
  status: 'processed' | 'dlq';
  attempts: number;
};

export type ConsumeLoopResult = {
  processed: number;
  dlq: number;
  skipped_due_shutdown: number;
  queue_size: number;
};

const tracer = trace.getTracer('worker-event');
const defaultMaxRetries = 3;
const defaultBaseBackoffMs = 250;
const defaultMaxBackoffMs = 5000;
const defaultJitterRatio = 0.1;
const defaultProcessDelayMs = 50;

const seedQueue: QueueMessage[] = [
  { id: 'evt-001', eventType: 'order.created', payload: { orderId: 'o-1' } },
  { id: 'evt-002', eventType: 'order.failed', payload: { orderId: 'o-2', shouldFail: true } },
  { id: 'evt-003', eventType: 'order.shipped', payload: { orderId: 'o-3' } }
];

const deadLetterQueue: DlqRecord[] = [];
let shutdownRequested = false;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createSeedQueue(): QueueMessage[] {
  return seedQueue.map((message) => ({
    id: message.id,
    eventType: message.eventType,
    payload: { ...message.payload }
  }));
}

export function resetDlq(): void {
  deadLetterQueue.length = 0;
}

export function dlqSnapshot(): DlqRecord[] {
  return deadLetterQueue.map((record) => ({ ...record }));
}

export function requestShutdown(): void {
  shutdownRequested = true;
}

export function resetShutdownSignal(): void {
  shutdownRequested = false;
}

export function calculateBackoffMs(attempt: number, options: BackoffOptions = {}): number {
  const baseBackoffMs = options.baseBackoffMs ?? defaultBaseBackoffMs;
  const maxBackoffMs = options.maxBackoffMs ?? defaultMaxBackoffMs;
  const jitterRatio = options.jitterRatio ?? defaultJitterRatio;
  const random = options.random ?? Math.random;

  const exponential = baseBackoffMs * 2 ** Math.max(0, attempt - 1);
  const capped = Math.min(exponential, maxBackoffMs);
  const jitterWindow = capped * Math.max(0, jitterRatio);
  const jitterOffset = (random() * 2 - 1) * jitterWindow;

  return Math.max(0, Math.round(capped + jitterOffset));
}

async function defaultProcessMessage(message: QueueMessage, attempt: number, logger: Logger, processDelayMs: number): Promise<void> {
  const span = tracer.startSpan('worker.process_message');
  span.setAttribute('messaging.message_id', message.id);
  span.setAttribute('messaging.destination_kind', 'queue');
  span.setAttribute('messaging.operation', 'process');
  span.setAttribute('worker.attempt', attempt);

  try {
    const shouldFail = Boolean(message.payload['shouldFail']);
    if (shouldFail) {
      throw new Error('simulated processing failure');
    }

    await sleep(processDelayMs);
    incMetric('worker_processed_total');
    logger.info({ message_id: message.id, event_type: message.eventType, attempt }, 'message processed');
  } catch (error) {
    incMetric('worker_failed_total');
    throw error;
  } finally {
    span.end();
  }
}

async function sendToDlq(message: QueueMessage, reason: string, logger: Logger, now: () => Date): Promise<void> {
  deadLetterQueue.push({
    message_id: message.id,
    event_type: message.eventType,
    reason,
    failed_at: now().toISOString()
  });
  incMetric('worker_dlq_total');

  // Stub: replace with provider-specific DLQ integration.
  logger.error({ message_id: message.id, reason }, 'message moved to DLQ');
}

export async function processWithRetry(message: QueueMessage, options: ProcessWithRetryOptions = {}): Promise<ProcessResult> {
  const logger = options.logger || createLogger();
  const sleepFn = options.sleepFn || sleep;
  const processMessageFn = options.processMessageFn;
  const maxRetries = Math.max(1, options.maxRetries ?? defaultMaxRetries);
  const processDelayMs = options.processDelayMs ?? defaultProcessDelayMs;
  const now = options.now || (() => new Date());

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    incMetric('worker_attempt_total');

    try {
      if (processMessageFn) {
        await processMessageFn(message, attempt);
      } else {
        await defaultProcessMessage(message, attempt, logger, processDelayMs);
      }

      return { status: 'processed', attempts: attempt };
    } catch (error) {
      if (attempt === maxRetries) {
        await sendToDlq(message, (error as Error).message, logger, now);
        return { status: 'dlq', attempts: attempt };
      }

      const backoff = calculateBackoffMs(attempt, {
        baseBackoffMs: options.baseBackoffMs,
        maxBackoffMs: options.maxBackoffMs,
        jitterRatio: options.backoffJitterRatio,
        random: options.random
      });

      incMetric('worker_retried_total');
      logger.warn(
        {
          message_id: message.id,
          attempt,
          backoff_ms: backoff,
          error: (error as Error).message
        },
        'message processing failed, retrying'
      );
      await sleepFn(backoff);
    }
  }

  return { status: 'dlq', attempts: maxRetries };
}

export async function consumeLoop(messages: QueueMessage[], options: ProcessWithRetryOptions = {}): Promise<ConsumeLoopResult> {
  const logger = options.logger || createLogger();
  let processed = 0;
  let dlq = 0;
  let skippedDueShutdown = 0;

  logger.info({ queue_size: messages.length }, 'starting consume loop');

  for (let index = 0; index < messages.length; index += 1) {
    const message = messages[index];
    if (shutdownRequested) {
      skippedDueShutdown = messages.length - index;
      logger.warn({ remaining_messages: skippedDueShutdown }, 'shutdown requested, stopping consume loop');
      break;
    }

    const result = await processWithRetry(message, { ...options, logger });
    if (result.status === 'processed') {
      processed += 1;
    } else {
      dlq += 1;
    }
  }

  const summary: ConsumeLoopResult = {
    processed,
    dlq,
    skipped_due_shutdown: skippedDueShutdown,
    queue_size: messages.length
  };

  logger.info(
    {
      summary,
      metrics: metricsSnapshot(),
      dlq_size: deadLetterQueue.length
    },
    'consume loop finished'
  );

  return summary;
}

function installSignalHandlers(logger: Logger): () => void {
  const onSigInt = () => {
    logger.warn({ signal: 'SIGINT' }, 'shutdown signal received');
    requestShutdown();
  };
  const onSigTerm = () => {
    logger.warn({ signal: 'SIGTERM' }, 'shutdown signal received');
    requestShutdown();
  };

  process.once('SIGINT', onSigInt);
  process.once('SIGTERM', onSigTerm);

  return () => {
    process.off('SIGINT', onSigInt);
    process.off('SIGTERM', onSigTerm);
  };
}

async function closeMetricsServer(server: Server, logger: Logger): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
  logger.info('metrics server closed');
}

export async function main(env: NodeJS.ProcessEnv = process.env): Promise<void> {
  const config: WorkerConfig = loadConfig(env);
  const logger = createLogger({
    serviceName: config.serviceName,
    environment: config.environment,
    level: config.logLevel
  });

  bootstrapTelemetry(config.serviceName);
  resetShutdownSignal();
  resetMetrics();
  resetDlq();

  let metricsServer: Server | undefined;
  if (config.metricsPort) {
    metricsServer = startMetricsServer(config.metricsPort);
    logger.info({ metrics_port: config.metricsPort, metrics_path: '/metrics' }, 'metrics endpoint enabled');
  }

  const cleanupSignals = installSignalHandlers(logger);

  try {
    await consumeLoop(createSeedQueue(), {
      logger,
      maxRetries: config.maxRetries,
      baseBackoffMs: config.baseBackoffMs,
      maxBackoffMs: config.maxBackoffMs,
      backoffJitterRatio: config.backoffJitterRatio,
      processDelayMs: config.processDelayMs
    });
  } finally {
    cleanupSignals();

    if (metricsServer) {
      await closeMetricsServer(metricsServer, logger);
    }
  }
}

if (require.main === module) {
  main().catch((error) => {
    const logger = createLogger();
    logger.fatal({ err: error }, 'worker finished with fatal error');
    process.exit(1);
  });
}

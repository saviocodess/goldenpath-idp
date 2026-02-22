import http from 'node:http';

const counters = {
  worker_attempt_total: 0,
  worker_processed_total: 0,
  worker_failed_total: 0,
  worker_retried_total: 0,
  worker_dlq_total: 0
};

export type MetricName = keyof typeof counters;

const metricHelp: Record<MetricName, string> = {
  worker_attempt_total: 'Total processing attempts (including retries)',
  worker_processed_total: 'Total successfully processed messages',
  worker_failed_total: 'Total failed processing attempts',
  worker_retried_total: 'Total retry operations executed',
  worker_dlq_total: 'Total messages moved to dead-letter queue'
};

export function incMetric(name: MetricName, value = 1): void {
  counters[name] += value;
}

export function resetMetrics(): void {
  for (const name of Object.keys(counters) as MetricName[]) {
    counters[name] = 0;
  }
}

export function metricsSnapshot(): Record<MetricName, number> {
  return { ...counters };
}

export function metricsAsPrometheus(): string {
  return (Object.keys(counters) as MetricName[])
    .flatMap((name) => [
      `# HELP ${name} ${metricHelp[name]}`,
      `# TYPE ${name} counter`,
      `${name} ${counters[name]}`
    ])
    .join('\n')
    .concat('\n');
}

export function startMetricsServer(port: number): http.Server {
  return http
    .createServer((req, res) => {
      if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'method_not_allowed' }));
        return;
      }

      if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
        return;
      }

      if (req.url !== '/metrics') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'not_found' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/plain; version=0.0.4' });
      res.end(metricsAsPrometheus());
    })
    .listen(port);
}

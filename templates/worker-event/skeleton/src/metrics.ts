import http from 'node:http';

const counters: Record<string, number> = {
  worker_processed_total: 0,
  worker_failed_total: 0,
  worker_retried_total: 0,
  worker_dlq_total: 0
};

export function incMetric(name: keyof typeof counters, value = 1): void {
  counters[name] += value;
}

export function metricsSnapshot(): Record<string, number> {
  return { ...counters };
}

export function metricsAsPrometheus(): string {
  return Object.entries(counters)
    .map(([name, value]) => `${name} ${value}`)
    .join('\n');
}

export function startMetricsServer(port: number): http.Server {
  return http
    .createServer((req, res) => {
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

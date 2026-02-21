[Português (Brasil)](README.pt-BR.md) | **English**

# ${{ values.name }}

Node.js + TypeScript asynchronous worker generated from the `worker-event` Golden Path.

## Delivered Contracts

- Simulated consumption loop with retry and exponential backoff
- JSON structured logging
- In-memory metrics with optional `/metrics`
- DLQ integration stub
- OpenTelemetry instrumentation points

## Run locally

```bash
corepack enable
yarn install
yarn dev
```

## Build and run

```bash
yarn build
yarn start
```

## Metrics

- Set `METRICS_PORT=9464` to expose `GET /metrics`.
- Exported counters:
  - `worker_processed_total`
  - `worker_failed_total`
  - `worker_retried_total`
  - `worker_dlq_total`

## DLQ

`sendToDlq` in `src/worker.ts` is a stub. In production, integrate with your messaging provider dead-letter strategy.

## OpenTelemetry

1. `src/otel.ts` already includes a lightweight bootstrap.
2. In production, replace it with `@opentelemetry/sdk-node` and runtime instrumentation.
3. Configure baseline variables:

```bash
export OTEL_SERVICE_NAME=${{ values.name }}
export OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318
export OTEL_TRACES_SAMPLER=parentbased_traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
export OTEL_DEBUG=false
```

4. Keep worker spans in `src/worker.ts` for processing correlation.

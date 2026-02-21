# ${{ values.name }}

Worker assíncrono em Node.js + TypeScript criado a partir do Golden Path `worker-event`.

## Contratos entregues

- Loop de consumo com retry e exponential backoff
- Logs estruturados em JSON
- Métricas básicas em memória
- Endpoint opcional `/metrics`
- Stub de integração com DLQ
- Pontos de instrumentação OpenTelemetry

## Executar localmente

```bash
corepack enable
yarn install
yarn dev
```

## Build e execução

```bash
yarn build
yarn start
```

## Métricas

- Defina `METRICS_PORT=9464` para expor endpoint `GET /metrics` no processo.
- Métricas disponíveis: `worker_processed_total`, `worker_failed_total`, `worker_retried_total`, `worker_dlq_total`.

## DLQ

A função `sendToDlq` em `src/worker.ts` é um stub. Em produção, conecte com fila dedicada (ex.: SQS DLQ, Kafka dead-letter topic).

## OpenTelemetry (instruções)

1. O projeto já inclui `src/otel.ts` com bootstrap inicial e logs de configuração.
2. Em produção, substitua o bootstrap simplificado por `@opentelemetry/sdk-node` e instrumentações do runtime.
3. Configure variáveis mínimas:

```bash
export OTEL_SERVICE_NAME=${{ values.name }}
export OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318
export OTEL_TRACES_SAMPLER=parentbased_traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
export OTEL_DEBUG=false
```

4. Mantenha os spans de processamento já previstos em `src/worker.ts`.

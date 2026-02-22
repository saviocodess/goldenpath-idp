**Português (Brasil)** | [English](README.md)

# ${{ values.name }}

Worker assíncrono em Node.js + TypeScript gerado a partir do Golden Path `worker-event`.

## Contratos Entregues

- Loop de consumo simulado com retry e exponential backoff
- Logging estruturado em JSON
- Métricas em memória com endpoint opcional `/metrics`
- Exposição Prometheus e endpoint `/health` no servidor de métricas
- Stub de integração com DLQ
- Pontos de instrumentação OpenTelemetry

## Executar localmente

```bash
corepack enable
cp .env.example .env
yarn install
yarn dev
```

## Build e execução

```bash
yarn typecheck
yarn test
yarn build
yarn start
```

## Métricas

- Defina `METRICS_PORT=9464` para expor `GET /metrics`.
- `GET /health` também é exposto no servidor de métricas para probes.
- Contadores exportados:
  - `worker_attempt_total`
  - `worker_processed_total`
  - `worker_failed_total`
  - `worker_retried_total`
  - `worker_dlq_total`

## DLQ

`sendToDlq` em `src/worker.ts` é um stub. Em produção, integre com a estratégia de dead-letter do seu provedor de mensageria.

## OpenTelemetry

1. `src/otel.ts` já inclui bootstrap leve.
2. Em produção, substitua por `@opentelemetry/sdk-node` e instrumentações de runtime.
3. Configure variáveis base:

```bash
export OTEL_SERVICE_NAME=${{ values.name }}
export OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318
export OTEL_TRACES_SAMPLER=parentbased_traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
export OTEL_DEBUG=false
```

4. Mantenha os spans do worker em `src/worker.ts` para correlação de processamento.

## Configuração de runtime

- `MAX_RETRIES` (padrão: `3`)
- `BASE_BACKOFF_MS` (padrão: `250`)
- `MAX_BACKOFF_MS` (padrão: `5000`)
- `BACKOFF_JITTER_RATIO` (padrão: `0.1`)
- `PROCESS_DELAY_MS` (padrão: `50`)
- `METRICS_PORT` (opcional; habilita servidor de métricas)
- Veja `.env.example` como baseline local pronto para edição.

**Português (Brasil)** | [English](../../en/standards/observability-otel.md)

# Standard: Observability (OpenTelemetry)

## Objetivo

Padronizar correlação de traces, métricas e logs para melhorar detecção e reduzir MTTR.

## Traces

- Criar ao menos um span por operação de entrada:
  - requisição HTTP
  - consumo de evento
- Convenção de nomenclatura:
  - HTTP: `http.<method>`
  - Worker: `worker.process_message`
- Atributos mínimos:
  - `service.name`
  - `deployment.environment`
  - `http.route` ou `messaging.message_id`

## Métricas

Todo serviço deve oferecer ao menos:

- throughput
- taxa de erro
- latência

Workers devem expor contadores de retry e DLQ.

## Correlação de Logs e Traces

- Incluir `trace_id` e `span_id` nos logs quando houver contexto.
- Manter `request_id` para debugging operacional.

## Sampling

- Dev: até 100% quando necessário
- Prod: `parentbased_traceidratio`, razão inicial entre `0.05` e `0.2`

## Estratégia de Export

- Usar OTLP HTTP/gRPC para collector centralizado.
- Evitar acoplamento direto a múltiplos vendors no nível do serviço.

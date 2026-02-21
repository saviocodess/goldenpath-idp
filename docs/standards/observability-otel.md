# Standard: Observability (OpenTelemetry)

## Objetivo

Padronizar geração de traces, metrics e correlação de logs para reduzir MTTR.

## Traces

- Sempre criar span por operação de entrada:
  - HTTP request
  - consumo de evento
- Naming convention:
  - HTTP: `http.<method>`
  - Worker: `worker.process_message`
- Atributos mínimos:
  - `service.name`
  - `deployment.environment`
  - `http.route` ou `messaging.message_id`

## Metrics

- Métricas mínimas por serviço:
  - throughput
  - erro
  - latência
- Workers devem expor contador de retry e DLQ.

## Logs + traces

- Incluir `trace_id` e `span_id` nos logs quando contexto existir.
- Manter `request_id` para troubleshooting operacional.

## Sampling

- Ambiente dev: até 100% quando necessário
- Ambiente prod: `parentbased_traceidratio` com taxa inicial entre 0.05 e 0.2

## Export

- OTLP HTTP/gRPC para collector central
- Não enviar diretamente para múltiplos vendors por serviço

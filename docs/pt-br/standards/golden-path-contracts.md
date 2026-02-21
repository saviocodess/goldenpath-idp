**Português (Brasil)** | [English](../../en/standards/golden-path-contracts.md)

# Standard: Golden Path Contracts

## Objetivo

Definir critérios mandatórios para qualquer template oficial de serviço.

## Contrato Compartilhado

- `catalog-info.yaml` válido
- README operacional (execução, build, operação)
- Pipeline CI com lint/typecheck/test/build
- Logging estruturado em JSON
- Guia de instrumentação OpenTelemetry
- Health checks (ou equivalente para worker)
- Runbook operacional inicial

## Contrato Microservice HTTP

- Endpoints `/health` e `/ready`
- Middleware de `request_id`
- Dockerfile pronto para container

## Contrato Worker Event

- Loop de consumo com retry/backoff
- Stub de DLQ documentado
- Métricas mínimas de processamento

## Critérios de Aceite

- Template gera estrutura pronta para produção sem scaffolding manual
- CI usa uma etapa de instalação por job
- Sem duplicidade de dependências no `package.json`

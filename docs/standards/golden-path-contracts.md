# Standard: Golden Path Contracts

## Objetivo

Definir critérios mandatórios para qualquer serviço gerado pelos templates.

## Contrato comum

- `catalog-info.yaml` válido
- README com execução local, build e operação
- Pipeline CI com lint/typecheck/test/build
- Logs JSON
- Instrumentação OpenTelemetry documentada
- Health checks (ou equivalente para worker)
- Runbook inicial vinculado

## Contrato específico: microservice-http

- Endpoints `/health` e `/ready`
- Middleware de `request_id`
- Dockerfile pronto para build

## Contrato específico: worker-event

- Loop de consumo com retry/backoff
- Stub de DLQ documentado
- Métricas mínimas de processamento

## Critérios de aceite

- Template gera projeto sem ajustes estruturais manuais
- CI executa com único install por job
- Sem dependências duplicadas no `package.json`

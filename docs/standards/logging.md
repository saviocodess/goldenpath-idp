# Standard: Logging

## Objetivo

Garantir logs consistentes, pesquisáveis e úteis para troubleshooting e auditoria.

## Formato obrigatório

- JSON por linha
- Timestamp em ISO-8601 UTC
- Nível (`debug`, `info`, `warn`, `error`, `fatal`)

## Campos obrigatórios

- `timestamp`
- `level`
- `service`
- `environment`
- `message`
- `request_id` (serviços HTTP)
- `trace_id` e `span_id` quando disponíveis

## Campos recomendados

- `owner`
- `version`
- `operation`
- `error_code`
- `duration_ms`

## Exemplo

```json
{
  "timestamp": "2026-02-21T12:00:00.000Z",
  "level": "info",
  "service": "payments-api",
  "environment": "prod",
  "request_id": "7ab4d44f-8fab-4fef-a183-df9c62fd2cd8",
  "message": "request concluída",
  "duration_ms": 42
}
```

## Não conformidades

- Log textual livre sem JSON
- Dump de payload sensível
- Ausência de `request_id` em fluxo HTTP

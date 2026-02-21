**Português (Brasil)** | [English](../../en/standards/logging.md)

# Standard: Logging

## Objetivo

Garantir logs consistentes, pesquisáveis e acionáveis para troubleshooting, incidentes e auditoria.

## Formato Obrigatório

- JSON por linha
- Timestamp UTC em ISO-8601
- Nível (`debug`, `info`, `warn`, `error`, `fatal`)

## Campos Obrigatórios

- `timestamp`
- `level`
- `service`
- `environment`
- `message`
- `request_id` (serviços HTTP)
- `trace_id` e `span_id` quando disponíveis

## Campos Recomendados

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

## Padrões Não Conformes

- Log textual livre em vez de JSON
- Dump de payload sensível em logs
- Ausência de `request_id` no fluxo HTTP

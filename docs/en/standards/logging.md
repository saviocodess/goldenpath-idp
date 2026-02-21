[Português (Brasil)](../../pt-br/standards/logging.md) | **English**

# Standard: Logging

## Objective

Guarantee consistent, searchable, and actionable logs for troubleshooting, incident response, and audits.

## Required Format

- JSON per line
- UTC ISO-8601 timestamp
- Log level (`debug`, `info`, `warn`, `error`, `fatal`)

## Required Fields

- `timestamp`
- `level`
- `service`
- `environment`
- `message`
- `request_id` (HTTP services)
- `trace_id` and `span_id` when available

## Recommended Fields

- `owner`
- `version`
- `operation`
- `error_code`
- `duration_ms`

## Example

```json
{
  "timestamp": "2026-02-21T12:00:00.000Z",
  "level": "info",
  "service": "payments-api",
  "environment": "prod",
  "request_id": "7ab4d44f-8fab-4fef-a183-df9c62fd2cd8",
  "message": "request completed",
  "duration_ms": 42
}
```

## Non-compliant Patterns

- Plain text logs instead of JSON
- Sensitive payload dump in logs
- Missing `request_id` in HTTP request flow

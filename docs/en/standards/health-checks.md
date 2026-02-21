[Português (Brasil)](../../pt-br/standards/health-checks.md) | **English**

# Standard: Health Checks

## Objective

Define a consistent health and readiness contract for generated services.

## Required Endpoints

- `GET /health`: process-level health status
- `GET /ready`: traffic/process readiness

## Minimum Response Contract

`/health`:

- `status: ok`
- `uptime_seconds`
- `timestamp`

`/ready`:

- `status: ready | not_ready`
- `checks` with internal readiness validations

## HTTP Status Codes

- `200` for healthy/ready
- `503` for not ready

## Rules

- No destructive checks
- No sensitive data in payload
- Typical endpoint latency target: under 100ms

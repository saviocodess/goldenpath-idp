[Português (Brasil)](../../pt-br/standards/golden-path-contracts.md) | **English**

# Standard: Golden Path Contracts

## Objective

Define mandatory criteria for any official service template.

## Shared Contract

- Valid `catalog-info.yaml`
- Operational README (run, build, operations)
- CI pipeline with lint/typecheck/test/build
- JSON structured logging
- OpenTelemetry instrumentation guidance
- Health checks (or worker equivalent)
- Initial operational runbook

## Microservice HTTP Contract

- `/health` and `/ready`
- `request_id` middleware
- Container-ready Dockerfile

## Worker Event Contract

- Consumption loop with retry/backoff
- Documented DLQ stub
- Minimum processing metrics

## Acceptance Criteria

- Template generates production-ready structure without manual scaffolding
- CI uses one install step per job
- No dependency duplication in `package.json`

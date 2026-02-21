[Português (Brasil)](../../pt-br/adr/0005-standards-observability-opentelemetry.md) | **English**

# ADR 0005: OpenTelemetry as Observability Standard

Status: Accepted
Date: 2026-02-21

## Context

Inconsistent telemetry patterns increase failure detection time and make incident analysis harder.

## Decision

Adopt OpenTelemetry as the default standard for distributed tracing and signal correlation in Golden Paths.

## Alternatives Considered

1. Team-specific observability without standardization.
2. Logs-only observability without distributed traces.
3. Vendor-specific SDK coupling at template level.

## Consequences

### Positive

- open, portable telemetry model
- better trace/log/metric correlation
- incremental observability maturity path

### Negative

- initial collector setup cost
- enablement/training requirement for teams

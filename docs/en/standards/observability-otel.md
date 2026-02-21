[Português (Brasil)](../../pt-br/standards/observability-otel.md) | **English**

# Standard: Observability (OpenTelemetry)

## Objective

Standardize trace, metric, and log correlation to improve detection speed and reduce MTTR.

## Traces

- Create at least one span per ingress operation:
  - HTTP request
  - event consumption
- Naming convention:
  - HTTP: `http.<method>`
  - Worker: `worker.process_message`
- Minimum attributes:
  - `service.name`
  - `deployment.environment`
  - `http.route` or `messaging.message_id`

## Metrics

Every service should provide at least:

- throughput
- error rate
- latency

Workers must expose retry and DLQ counters.

## Logs and Trace Correlation

- Include `trace_id` and `span_id` in logs when context exists.
- Keep `request_id` for operational debugging.

## Sampling

- Dev: up to 100% when needed
- Prod: `parentbased_traceidratio`, initial ratio between `0.05` and `0.2`

## Export Strategy

- Use OTLP HTTP/gRPC toward a centralized collector.
- Avoid direct multi-vendor coupling at service level.

[Português (Brasil)](README.pt-BR.md) | **English**

# ${{ values.name }}

Node.js + TypeScript HTTP service generated from the `microservice-http` Golden Path.

## Delivered Contracts

- `GET /health` and `GET /ready`
- JSON structured logs
- `request_id` correlation middleware
- OpenTelemetry instrumentation points
- CI pipeline with lint, typecheck, tests, and build

## Run locally

```bash
corepack enable
yarn install
yarn dev
```

## Build and run

```bash
yarn build
yarn start
```

## Container

```bash
docker build -t ${{ values.name }}:local .
docker run --rm -p 3000:3000 ${{ values.name }}:local
```

## OpenTelemetry

1. `src/otel.ts` already includes a lightweight bootstrap.
2. In production, replace it with `@opentelemetry/sdk-node` and runtime instrumentation.
3. Configure baseline variables:

```bash
export OTEL_SERVICE_NAME=${{ values.name }}
export OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318
export OTEL_TRACES_SAMPLER=parentbased_traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
export OTEL_DEBUG=false
```

4. Keep request spans in `src/server.ts` for HTTP correlation.

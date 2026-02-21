**Português (Brasil)** | [English](README.md)

# ${{ values.name }}

Serviço HTTP em Node.js + TypeScript gerado a partir do Golden Path `microservice-http`.

## Contratos Entregues

- `GET /health` e `GET /ready`
- Logs estruturados em JSON
- Middleware de correlação com `request_id`
- Pontos de instrumentação OpenTelemetry
- Pipeline CI com lint, typecheck, testes e build

## Executar localmente

```bash
corepack enable
yarn install
yarn dev
```

## Build e execução

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

1. `src/otel.ts` já inclui bootstrap leve.
2. Em produção, substitua por `@opentelemetry/sdk-node` e instrumentações de runtime.
3. Configure variáveis base:

```bash
export OTEL_SERVICE_NAME=${{ values.name }}
export OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318
export OTEL_TRACES_SAMPLER=parentbased_traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
export OTEL_DEBUG=false
```

4. Mantenha os spans de request em `src/server.ts` para correlação HTTP.

# ${{ values.name }}

Serviço HTTP em Node.js + TypeScript criado a partir do Golden Path `microservice-http`.

## Contratos entregues

- Endpoints `GET /health` e `GET /ready`
- Logs estruturados em JSON
- Correlação por `request_id` em middleware
- Pontos de instrumentação OpenTelemetry
- Pipeline de CI com lint, typecheck, testes e build

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

## OpenTelemetry (instruções)

1. O projeto já inclui `src/otel.ts` com bootstrap inicial e logs de configuração.
2. Em produção, substitua o bootstrap simplificado por `@opentelemetry/sdk-node` e instrumentações do runtime.
3. Configure variáveis mínimas:
2. Configure variáveis mínimas:

```bash
export OTEL_SERVICE_NAME=${{ values.name }}
export OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318
export OTEL_TRACES_SAMPLER=parentbased_traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
export OTEL_DEBUG=false
```

4. Mantenha os spans de request já previstos em `src/server.ts` para correlação HTTP.

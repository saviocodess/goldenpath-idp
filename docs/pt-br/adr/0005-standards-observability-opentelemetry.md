**Português (Brasil)** | [English](../../en/adr/0005-standards-observability-opentelemetry.md)

# ADR 0005: OpenTelemetry como Padrão de Observabilidade

Status: Accepted
Data: 2026-02-21

## Contexto

Padrões inconsistentes de telemetria aumentam tempo de detecção de falhas e dificultam análise de incidentes.

## Decisão

Adotar OpenTelemetry como padrão para tracing distribuído e correlação de sinais nos Golden Paths.

## Alternativas Consideradas

1. Observabilidade específica por time sem padronização.
2. Observabilidade apenas por logs sem traces distribuídos.
3. Acoplamento com SDK específico de vendor no nível do template.

## Consequências

### Positivas

- modelo de telemetria aberto e portável
- melhor correlação entre traces, logs e métricas
- evolução incremental de maturidade em observabilidade

### Negativas

- custo inicial de setup de collector
- necessidade de capacitação dos times

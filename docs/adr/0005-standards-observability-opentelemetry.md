# ADR 0005: Padrão de Observabilidade com OpenTelemetry

Status: Accepted
Data: 2026-02-21

## Contexto

A ausência de telemetria uniforme dificulta detecção de falhas e aumenta MTTR.

## Decisão

OpenTelemetry será padrão para instrumentação de traces e correlação com logs/metrics nos Golden Paths.

## Alternativas consideradas

1. Instrumentação ad-hoc por squad sem padrão único.
2. Apenas logs sem traces distribuídos.
3. Vendor lock-in direto no SDK de observabilidade específico.

## Consequências

- Positivas:
  - padrão aberto e portável
  - melhor correlação entre sinais
  - suporte a evolução gradual de observabilidade
- Negativas:
  - custo inicial de configuração do collector
  - necessidade de capacitação dos times

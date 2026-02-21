# ADR 0001: Escopo do IDP e Não Objetivos

Status: Accepted
Data: 2026-02-21

## Contexto

A organização precisa reduzir tempo de setup de serviços e variabilidade de práticas entre squads. Sem padronização, ocorre retrabalho de infraestrutura, observabilidade e pipelines.

## Decisão

Criar um repositório de IDP orientado a Golden Paths com dois templates iniciais (`microservice-http` e `worker-event`), padrões obrigatórios, runbooks e GitOps de referência.

## Alternativas consideradas

1. Não criar IDP e manter autonomia total por squad.
2. Criar apenas documentação sem templates executáveis.
3. Adotar um único template genérico para todos os casos.

## Consequências

- Positivas:
  - redução de lead time para novos serviços
  - melhoria de consistência operacional
  - base para governança gradual
- Negativas:
  - necessidade de manutenção contínua dos templates
  - risco de resistência inicial de times

**Português (Brasil)** | [English](../../en/adr/0001-idp-scope-and-non-goals.md)

# ADR 0001: Escopo do IDP e Não Objetivos

Status: Accepted
Data: 2026-02-21

## Contexto

A organização precisa reduzir tempo de setup de serviços e variabilidade de engenharia entre squads. Sem padrões de plataforma, os times duplicam trabalho de infraestrutura, observabilidade e CI/CD.

## Decisão

Estabelecer um repositório de IDP focado em Golden Paths com dois templates iniciais (`microservice-http` e `worker-event`), padrões obrigatórios, runbooks e referências de GitOps.

## Alternativas Consideradas

1. Manter setup totalmente autônomo por time.
2. Fornecer apenas documentação sem templates executáveis.
3. Usar um único template genérico para todos os perfis de serviço.

## Consequências

### Positivas

- redução de lead time para novos serviços
- maior consistência operacional
- base para governança de plataforma

### Negativas

- esforço contínuo de manutenção de templates
- possível resistência inicial dos times

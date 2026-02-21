**Português (Brasil)** | [English](../../en/adr/0002-backstage-approach-overlays-not-generated.md)

# ADR 0002: Backstage por Overlays, sem Geração Completa neste Repositório

Status: Accepted
Data: 2026-02-21

## Contexto

Este repositório roda em ambiente restrito, onde bootstrap pesado não é permitido, mas integração realista com Backstage continua obrigatória.

## Decisão

Manter apenas overlays de Backstage e templates do Scaffolder neste repositório. Não versionar runtime completo de Backstage aqui.

## Alternativas Consideradas

1. Comitar uma aplicação Backstage completa neste repositório.
2. Ignorar integração com Backstage e manter templates manuais.
3. Criar scripts automáticos de bootstrap para execução no CI.

## Consequências

### Positivas

- repositório leve e focado em ativos de plataforma
- reutilização em diferentes instâncias de Backstage

### Negativas

- exige aplicação dos overlays em ambiente real
- qualidade do setup depende de disciplina documental

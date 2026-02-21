# ADR 0002: Backstage por Overlays sem Geração no Repositório IDP

Status: Accepted
Data: 2026-02-21

## Contexto

O ambiente de desenvolvimento do repositório IDP é restrito (sem espaço para bootstrap pesado). Ainda assim, precisamos entregar integração realista com Backstage.

## Decisão

Manter apenas overlays e templates do Scaffolder neste repositório, sem gerar ou versionar uma instância completa de Backstage.

## Alternativas consideradas

1. Versionar uma instância Backstage completa neste mesmo repo.
2. Não integrar com Backstage e manter templates manuais.
3. Criar scripts automáticos de bootstrap executados no CI.

## Consequências

- Positivas:
  - repositório leve e focado em artefatos de plataforma
  - adoção flexível em diferentes instâncias Backstage
- Negativas:
  - requer etapa de aplicação de overlays em ambiente real
  - exige disciplina de documentação para setup

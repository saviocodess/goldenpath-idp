**Português (Brasil)** | [English](../../en/adr/0004-templates-design-contract.md)

# ADR 0004: Contrato de Design dos Templates

Status: Accepted
Data: 2026-02-21

## Contexto

Sem contrato formal, os templates evoluem de forma inconsistente e aumentam custo de suporte da plataforma.

## Decisão

Definir contrato obrigatório de templates em `docs/pt-br/standards/golden-path-contracts.md`, cobrindo:

- metadados de catálogo e ownership
- README operacional
- contrato mínimo de CI
- observabilidade e health checks

## Alternativas Consideradas

1. Contrato implícito apenas por exemplos de código.
2. Contrato totalmente flexível por owner de template.
3. Governança apenas por checklist de PR sem padrão formal.

## Consequências

### Positivas

- previsibilidade de saída do scaffolder
- menor custo de suporte de longo prazo

### Negativas

- barra de contribuição mais rígida para novos templates

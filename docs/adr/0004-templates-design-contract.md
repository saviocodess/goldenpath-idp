# ADR 0004: Contrato de Design dos Templates

Status: Accepted
Data: 2026-02-21

## Contexto

Sem contrato formal, templates evoluem com divergência e quebram expectativas de squads e SRE.

## Decisão

Definir contrato obrigatório em `docs/standards/golden-path-contracts.md` para qualquer template oficial:

- catálogo e ownership
- README operacional
- CI mínimo
- observabilidade
- health checks (quando aplicável)

## Alternativas consideradas

1. Deixar contrato implícito em exemplos de código.
2. Permitir variação livre por template owner.
3. Formalizar somente via checklist de PR sem documentação de padrão.

## Consequências

- Positivas:
  - previsibilidade no resultado do scaffolder
  - menor custo de suporte da plataforma
- Negativas:
  - maior rigor para contribuição de novos templates

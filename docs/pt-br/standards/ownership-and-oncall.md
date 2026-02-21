**Português (Brasil)** | [English](../../en/standards/ownership-and-oncall.md)

# Standard: Ownership and On-call

## Objetivo

Garantir responsabilidade explícita sobre ciclo de vida do serviço e operação de incidentes.

## Ownership Obrigatório

- `catalog-info.yaml` deve definir `spec.owner`
- `CODEOWNERS` deve cobrir paths críticos
- Todo serviço deve definir time responsável e canal de suporte

## Expectativas de On-call

- Serviços em produção exigem rotação ativa
- Runbooks são obrigatórios para incidentes comuns
- Incidentes devem registrar timeline, impacto e ações

## Métricas Operacionais

- MTTR
- taxa de incidentes por serviço
- tempo de recuperação pós-rollback

## Escalonamento

- Severidade baseada em impacto de negócio
- Critérios claros para escalar liderança técnica

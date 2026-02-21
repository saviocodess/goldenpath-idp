# Standard: Ownership and On-call

## Objetivo

Garantir responsabilidade explícita por operação e evolução dos serviços.

## Ownership obrigatório

- `catalog-info.yaml` deve definir `spec.owner`
- `CODEOWNERS` deve cobrir paths críticos
- Cada serviço deve apontar time responsável e canal de contato

## On-call

- Serviço em produção requer rotação definida
- Runbooks obrigatórios para falhas comuns
- Incidentes devem registrar timeline, impacto e ações

## Métricas operacionais

- MTTR
- taxa de incidentes por serviço
- tempo de restauração após rollback

## Escalonamento

- Severidade definida por impacto
- Critérios claros para acionar liderança técnica

# Runbook: Rollback

## Quando executar

- Regressão funcional crítica após deploy
- Quebra de contrato de API/worker em produção
- Aumento abrupto de erro ou latência

## Pré-condições

- Identificar última versão estável (tag/SHA)
- Aprovação do responsável on-call
- Comunicação ao canal de incidente

## Procedimento GitOps

1. Criar PR revertendo commit ou restaurando image tag estável.
2. Marcar PR como `rollback` e priorizar revisão.
3. Merge da PR.
4. Acompanhar sincronização no Argo CD.
5. Confirmar health/readiness e métricas pós-rollback.

## Validações pós-rollback

- `Argo CD: Healthy + Synced`
- Erro e latência em baseline
- Eventos de fila normalizados (para worker)

## Pós-ação

- Abrir ação corretiva com owner e prazo
- Atualizar runbook/ADR se houver gap de processo

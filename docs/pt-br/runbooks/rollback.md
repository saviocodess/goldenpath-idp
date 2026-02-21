**Português (Brasil)** | [English](../../en/runbooks/rollback.md)

# Runbook: Rollback

## Quando Executar

- Regressão crítica após deploy
- Quebra de contrato de API/worker em produção
- Aumento abrupto de erro ou latência

## Pré-condições

- Identificar tag/SHA estável mais recente
- Aprovação do owner on-call
- Comunicação no canal de incidente iniciada

## Procedimento GitOps

1. Abrir PR revertendo commit ou restaurando tag de imagem estável.
2. Marcar PR como `rollback` e priorizar revisão.
3. Merge da PR.
4. Monitorar sincronização no Argo CD.
5. Validar health/readiness e métricas do serviço.

## Validação Pós-rollback

- `Argo CD: Healthy + Synced`
- Erro e latência em baseline
- Comportamento de fila/eventos normalizado no worker

## Pós-ação

- Abrir ação corretiva com owner e prazo
- Atualizar runbook/ADR ao identificar gaps de processo

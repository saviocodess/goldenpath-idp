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
- Confirmar que o alvo de rollback ainda existe no histórico Git / registry de imagens

## Procedimento GitOps

1. Abrir PR revertendo commit ou restaurando tag de imagem estável.
2. Marcar PR como `rollback` e priorizar revisão.
3. Merge da PR.
4. Monitorar sincronização no Argo CD.
5. Validar health/readiness e métricas do serviço.

### Alvos de Rollback por Arquivo (estrutura deste repo)

- Definições de apps filhas no Argo CD:
  - `gitops/argocd/apps/*.yaml`
- Manifests de exemplo e imagens:
  - `gitops/argocd/manifests/examples/*/deployment.yaml`
  - `gitops/argocd/manifests/examples/*/kustomization.yaml`
- Baseline de projeto/repositório do Argo CD (menos comum, mas possível):
  - `gitops/argocd/manifests/projects.yaml`
  - `gitops/argocd/manifests/repositories.yaml`

### Comandos de Validação (exemplos)

```bash
kubectl get applications -n argocd
kubectl describe app -n argocd example-microservice-http
kubectl describe app -n argocd example-worker-event
kubectl rollout status deploy/example-microservice-http -n microservice-http
kubectl rollout status deploy/example-worker-event -n worker-event
```

## Validação Pós-rollback

- `Argo CD: Healthy + Synced`
- Erro e latência em baseline
- Comportamento de fila/eventos normalizado no worker
- Sem erros remanescentes de permissão/path nos eventos do Argo CD (`project`, `repo`, `path`)

## Pós-ação

- Abrir ação corretiva com owner e prazo
- Atualizar runbook/ADR ao identificar gaps de processo

## Documentos Relacionados

- `docs/pt-br/gitops-argocd-operations.md`
- `docs/pt-br/runbooks/deploy-failure.md`
- `docs/pt-br/runbooks/incident-template.md`

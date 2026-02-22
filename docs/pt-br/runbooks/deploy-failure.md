**Português (Brasil)** | [English](../../en/runbooks/deploy-failure.md)

# Runbook: Deploy Failure

## Cenário

Falha de deploy no CI/CD ou Argo CD (`Degraded` / `OutOfSync` persistente).

## Sinais

- Pipeline falha em `build` ou etapa de deploy
- Erros de sync/reconciliation no Argo CD
- Pico de erro em health/readiness

## Checklist de Evidências Imediatas

Colete e registre:

- commit SHA / tag com falha
- nome(s) da(s) app(s) Argo CD afetada(s)
- namespace(s) e cluster/ambiente
- URL do workflow com falha
- mensagens de eventos da app no Argo CD
- status mais recente do rollout do deployment

## Ações Imediatas

1. Congelar merges relacionados.
2. Coletar evidências:
- SHA com falha
- logs do workflow
- eventos do Argo CD
3. Classificar severidade e impacto de negócio.

Comandos sugeridos (exemplos):

```bash
kubectl get applications -n argocd
kubectl describe app -n argocd example-microservice-http
kubectl describe app -n argocd example-worker-event
kubectl get deploy,po,svc -n microservice-http
kubectl get deploy,po -n worker-event
kubectl rollout status deploy/example-microservice-http -n microservice-http
```

## Diagnóstico

1. Inspecionar status e erros da app no Argo CD.
2. Validar manifests renderizados (`kustomization`, namespace, image tag).
3. Confirmar disponibilidade da imagem/tag no registry.
4. Validar dependências externas (secrets/configmaps).
5. Confirmar se permissões de projeto/repositório no Argo CD ainda correspondem à source/destination da app.

### Checks por Arquivo GitOps

- `gitops/argocd/manifests/projects.yaml`
  - `AppProject` `idp-apps` existe
  - namespace de destino listado em `spec.destinations`
- `gitops/argocd/manifests/repositories.yaml`
  - URL do secret de repositório coincide com o `repoURL` da app
- `gitops/argocd/apps/*.yaml`
  - `spec.project`, `spec.source.path`, `targetRevision`, `destination.namespace`
- `gitops/argocd/manifests/examples/<app>/kustomization.yaml`
  - lista de resources válida e arquivos existentes

### Validação de Probes e Portas (exemplos deste repo)

- `example-microservice-http`
  - readiness: `GET /ready` na porta `3000`
  - liveness: `GET /health` na porta `3000`
- `example-worker-event`
  - liveness: `GET /metrics` na porta `9464`

## Mitigação

1. Erro de configuração: abrir PR corretiva imediata.
2. Erro de imagem: promover última tag estável.
3. Impacto em produção: executar runbook de rollback.

## Gatilhos de Escalonamento

Escale para modo de incidente se qualquer condição persistir além do threshold do time:

- retries de sync repetidos sem progresso
- degradação ampla de serviço em múltiplas apps/namespaces
- rollback bloqueado por erro de permissão de projeto/repositório
- perda de sinais de observabilidade durante a remediação

## Critérios de Resolução

- Estado da app em `Healthy` e `Synced`
- Budget de erro retorna ao baseline
- Registro do incidente atualizado com causa raiz preliminar

## Documentos Relacionados

- `docs/pt-br/gitops-argocd-operations.md`
- `docs/pt-br/runbooks/rollback.md`
- `docs/pt-br/runbooks/incident-template.md`

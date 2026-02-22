**Português (Brasil)** | [English](../en/gitops-argocd-operations.md)

# Guia de Operação GitOps / Argo CD (PT-BR)

Este guia explica como a base GitOps deste repositório está organizada e como operá-la/customizá-la com segurança.

## Escopo

Cobertura:

- layout app-of-apps do Argo CD usado em `gitops/argocd`
- onboarding dos apps de exemplo
- customização após fork
- checks de validação e troubleshooting para operadores

## Mapa de Manifests (função de cada arquivo)

Manifests base:

- `gitops/argocd/manifests/namespaces.yaml`
  - cria `microservice-http`, `worker-event` e `idp-platform`
- `gitops/argocd/manifests/projects.yaml`
  - define o `AppProject` `idp-apps` do Argo CD
  - restringe `sourceRepos` e `destinations` permitidos
- `gitops/argocd/manifests/repositories.yaml`
  - registra o repositório Git no Argo CD via secret de repositório
- `gitops/argocd/manifests/kustomization.yaml`
  - agrega os manifests base acima

App-of-apps:

- `gitops/argocd/app-of-apps/root-app.yaml`
  - aplicação raiz do Argo CD apontando para `gitops/argocd/apps`

Apps filhas:

- `gitops/argocd/apps/example-microservice-http.yaml`
  - sincroniza `gitops/argocd/manifests/examples/microservice-http`
- `gitops/argocd/apps/example-worker-event.yaml`
  - sincroniza `gitops/argocd/manifests/examples/worker-event`

Workloads de exemplo:

- `gitops/argocd/manifests/examples/microservice-http/*`
  - deployment + service com probes `/health` e `/ready`
- `gitops/argocd/manifests/examples/worker-event/*`
  - deployment de worker com porta de métricas (`9464`) e liveness em `/metrics`

## Ordem Padrão de Apply (primeira instalação)

Aplique nesta ordem:

1. Instalação do Argo CD no namespace `argocd`
2. Manifests base GitOps do IDP:
   - `namespaces.yaml`
   - `projects.yaml`
   - `repositories.yaml`
3. Root app (`root-app.yaml`)
4. Sync das apps filhas e reconciliação dos workloads de exemplo

Por que essa ordem importa:

- `projects.yaml` precisa existir antes das apps filhas que usam `project: idp-apps`
- `repositories.yaml` precisa existir para o Argo CD acessar a origem Git

## Checklist de Customização Pós-Fork

Antes de usar em uma organização real, atualize:

- referências de URL de repositório:
  - `gitops/argocd/app-of-apps/root-app.yaml`
  - `gitops/argocd/apps/*.yaml`
  - `gitops/argocd/manifests/repositories.yaml`
- `targetRevision` (estratégia de branch/tag)
- destinos permitidos em `gitops/argocd/manifests/projects.yaml`
- imagens de exemplo (`ghcr.io/example/...`) nos deployments de exemplo
- allowlists do projeto Argo CD para aderir à política de segurança

## Como Adicionar um Novo App (via PR)

Fluxo recomendado de PR:

1. Adicione manifests do workload em:
   - `gitops/argocd/manifests/examples/<app-name>/`
2. Adicione `kustomization.yaml` nesse diretório.
3. Adicione o manifest da app filha do Argo CD:
   - `gitops/argocd/apps/<app-name>.yaml`
4. Se a app usar novo namespace:
   - adicione em `gitops/argocd/manifests/namespaces.yaml`
   - adicione destino permitido em `gitops/argocd/manifests/projects.yaml`
5. Atualize docs/runbooks se o comportamento operacional mudar de forma relevante.
6. Abra PR com plano de validação e rollback.

## Checklist de Validação do Operador (após sync)

Checks em Argo CD / Kubernetes:

- root app `goldenpath-idp-root` em `Healthy` + `Synced`
- apps filhas em `Healthy` + `Synced`
- namespaces existentes:
  - `microservice-http`
  - `worker-event`
- deployments disponíveis
- probes saudáveis

Comandos sugeridos (exemplo):

```bash
kubectl get applications -n argocd
kubectl get ns microservice-http worker-event idp-platform
kubectl get deploy,svc -n microservice-http
kubectl get deploy -n worker-event
kubectl describe app -n argocd example-microservice-http
kubectl describe app -n argocd example-worker-event
```

## Falhas Comuns (com checks por arquivo)

### 1. App filha falha com project inexistente / destino negado

Verifique:

- `gitops/argocd/manifests/projects.yaml`
  - `metadata.name: idp-apps`
  - namespace de destino presente em `spec.destinations`
- manifest da app filha com `spec.project` igual a `idp-apps`

### 2. Erros de acesso ao repositório ou resolução da source

Verifique:

- `gitops/argocd/manifests/repositories.yaml`
  - secret de repositório existente e URL igual ao `repoURL` da app filha
- `targetRevision` da app filha existe (branch ou tag)

### 3. Erros de path Kustomize / resources ausentes

Verifique:

- `spec.source.path` da app filha
- existência de `kustomization.yaml` no path alvo
- existência e validade dos arquivos referenciados

### 4. Workload sincroniza mas app fica `Degraded`

Verifique:

- acessibilidade da imagem no deployment (`ghcr.io/example/...` é placeholder)
- probes e portas:
  - `microservice-http`: `/health`, `/ready`, porta `3000`
  - `worker-event`: `/metrics`, porta `9464`
- secrets/configs exigidos pela sua customização

## Recomendações de Segurança e Governança

- Restrinja `clusterResourceWhitelist` e `namespaceResourceWhitelist` em `projects.yaml` para produção.
- Use credenciais de repositório/SSH ou GitHub App em vez de acesso público quando aplicável.
- Prefira projetos Argo CD por ambiente (ex.: `idp-apps-dev`, `idp-apps-prod`) em organizações maiores.
- Exija revisão de PR para mudanças em:
  - `gitops/argocd/apps/`
  - `gitops/argocd/manifests/`

## Documentos Relacionados

- `docs/pt-br/getting-started.md`
- `docs/pt-br/runbooks/deploy-failure.md`
- `docs/pt-br/runbooks/rollback.md`
- `docs/pt-br/adr/0003-gitops-argocd-app-of-apps.md`

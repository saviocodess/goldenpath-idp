**Português (Brasil)** | [English](README.md)

# GoldenPath IDP

Repositório de Internal Developer Platform (IDP) orientado a produção para reduzir tempo de bootstrap de serviços, padronizar engenharia e aumentar confiabilidade operacional.

## Resumo Executivo

Este repositório entrega uma base prática de engenharia de plataforma:

- Provisionamento self-service por templates do Backstage Scaffolder
- Golden Paths de referência para APIs HTTP e workers assíncronos
- Modelo de deploy GitOps com Argo CD app-of-apps
- Padrões prescritivos de observabilidade, segurança, CI/CD e ownership
- Runbooks operacionais e decisões arquiteturais para cenários reais

## Escopo do Repositório

- `templates/microservice-http`: blueprint Node.js/TypeScript para serviço HTTP
- `templates/worker-event`: blueprint Node.js/TypeScript para worker assíncrono
- `backstage/overlays`: overlays para registrar templates e entidades de catálogo
- `gitops/argocd`: root app, apps filhas e manifests de deploy
- `docs/en`: documentação completa em inglês
- `docs/pt-br`: documentação completa em português (Brasil)

## Arquitetura

```mermaid
flowchart LR
  DEV[Developer] -->|Self-service| BS[Backstage Scaffolder]
  BS -->|Generate Repository| GH[GitHub]
  GH -->|PR + Quality Gates| CI[GitHub Actions]
  GH -->|Declarative manifests| GITOPS[GitOps Paths]
  GITOPS -->|Sync| ARGO[Argo CD]
  ARGO -->|Deploy| K8S[Kubernetes]
  K8S --> OBS[Logs, Metrics, Traces]
  OBS --> OPS[Runbooks and On-call]
```

## Como Usar

### 1. Fazer bootstrap do Backstage em máquina real

Este workspace é intencionalmente restrito; bootstrap pesado não é executado aqui.

```bash
npx @backstage/create-app@latest
```

Depois aplique os overlays deste repositório em `backstage/overlays`, conforme `backstage/README.md`.

### 2. Registrar templates no catálogo do Backstage

Adicione uma catalog location apontando para:

- `backstage/overlays/catalog/locations.yaml`

Confirme que os templates aparecem no Scaffolder:

- `microservice-http`
- `worker-event`

### 3. Gerar serviço pelos Golden Paths

Informe os parâmetros do template:

- nome do serviço (`kebab-case`)
- entidade owner
- repositório GitHub de destino

### 4. Habilitar GitOps com Argo CD

Aplique os manifests em ordem (fora deste ambiente restrito):

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl apply -f gitops/argocd/manifests/namespaces.yaml
kubectl apply -f gitops/argocd/manifests/projects.yaml
kubectl apply -f gitops/argocd/manifests/repositories.yaml
kubectl apply -f gitops/argocd/app-of-apps/root-app.yaml
```

### 5. Executar validações leves do repositório

```bash
make check
```

## Documentação

- Índice em inglês: `docs/en/index.md`
- Índice em português: `docs/pt-br/index.md`

## Roadmap

- `v0.2.x`: fortalecimento da documentação bilíngue + narrativa para recrutadores
- `v0.3.x`: novos Golden Paths e scorecards
- `v0.4.x`: modelo operacional de SLO/SLI e dashboards
- `v0.5.x`: métricas de adoção de plataforma por domínio/time

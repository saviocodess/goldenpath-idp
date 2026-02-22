[Português (Brasil)](../pt-br/getting-started.md) | **English**

# Getting Started (Real Use)

This guide is for engineers who want to clone this repository and use it as a real starter for:

- Backstage Golden Paths
- Argo CD GitOps app-of-apps
- Engineering standards and operational runbooks

## 1. Prerequisites (real machine)

Run the lightweight preflight:

```bash
bash scripts/preflight-tools.sh
```

Recommended tools by scenario:

- Repo validation only: `bash`, `git`, `node`, `corepack` (or `yarn`)
- Backstage bootstrap: `node`, `corepack`/`yarn`, `npx`
- GitOps demo on local cluster: `docker`, `kind`, `kubectl`, `helm`
- GitHub publishing and workflow operations: `gh` (optional but recommended)

## 2. Clone and validate the repository

```bash
git clone https://github.com/saviocodess/goldenpath-idp.git
cd goldenpath-idp
make check
```

What `make check` validates:

- duplicate dependencies in template `package.json`
- YAML/Markdown whitespace hygiene
- EN/PT-BR documentation parity
- shell script syntax
- local Markdown links

## 3. Backstage bootstrap and overlays (real environment)

Generate Backstage in a machine with enough disk/network capacity:

```bash
npx @backstage/create-app@latest
```

Then apply overlays from this repository (see `backstage/README.md`):

- merge `backstage/overlays/app-config.overlay.yaml` into your Backstage `app-config.yaml`
- register `backstage/overlays/catalog/locations.yaml`
- confirm the Scaffolder templates appear:
  - `microservice-http`
  - `worker-event`

## 4. Generate a service from a Golden Path

In Backstage Scaffolder, provide:

- service name (`kebab-case`)
- owner entity (for example `group:default/platform-team`)
- target GitHub repository

Generated repositories include:

- Node.js + TypeScript runtime
- CI workflow skeleton
- logging, health checks / metrics
- OpenTelemetry bootstrap points
- Dockerfile and local Makefile

## 5. Run generated services locally

Example flow (generated service repo):

```bash
corepack enable
cp .env.example .env
yarn install
yarn verify
yarn build
yarn start
```

Template-specific notes:

- `microservice-http`: health endpoints `/health` and `/ready`
- `worker-event`: optional metrics server with `METRICS_PORT=9464` exposing `/metrics` and `/health`

## 6. GitOps with Argo CD (app-of-apps)

This repository includes ready-to-apply Argo CD baseline manifests and example apps.

Apply in order (outside this constrained environment):

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl apply -f gitops/argocd/manifests/namespaces.yaml
kubectl apply -f gitops/argocd/manifests/projects.yaml
kubectl apply -f gitops/argocd/manifests/repositories.yaml
kubectl apply -f gitops/argocd/app-of-apps/root-app.yaml
```

Then verify:

- root application `goldenpath-idp-root` is healthy
- child apps `example-microservice-http` and `example-worker-event` sync successfully

## 7. GitHub repository settings (recommended)

To fully enable security automation:

- enable Dependency Graph in GitHub repository settings
- set repository variable `ENABLE_DEPENDENCY_REVIEW=true`
- optionally set `ENABLE_FULL_CI=true` to run install/lint/test/build in root CI

## 8. First demo checklist

- `make check` passes
- Backstage templates registered
- one service generated from Scaffolder
- Argo CD root app synced
- example app health verified in cluster
- docs links and runbooks reviewed by your team

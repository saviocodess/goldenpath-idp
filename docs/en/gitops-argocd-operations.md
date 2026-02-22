[Português (Brasil)](../pt-br/gitops-argocd-operations.md) | **English**

# GitOps / Argo CD Operations Guide (EN)

This guide explains how the GitOps baseline in this repository is organized and how to operate/customize it safely.

## Scope

Covers:

- Argo CD app-of-apps layout used in `gitops/argocd`
- onboarding of example apps
- customization after fork
- validation and troubleshooting checks for operators

## Manifest Map (what each file does)

Base manifests:

- `gitops/argocd/manifests/namespaces.yaml`
  - creates `microservice-http`, `worker-event`, and `idp-platform`
- `gitops/argocd/manifests/projects.yaml`
  - defines Argo CD `AppProject` `idp-apps`
  - constrains allowed `sourceRepos` and `destinations`
- `gitops/argocd/manifests/repositories.yaml`
  - registers the Git repository in Argo CD via repository secret
- `gitops/argocd/manifests/kustomization.yaml`
  - aggregates the baseline manifests above

App-of-apps:

- `gitops/argocd/app-of-apps/root-app.yaml`
  - root Argo CD application targeting `gitops/argocd/apps`

Child apps:

- `gitops/argocd/apps/example-microservice-http.yaml`
  - syncs `gitops/argocd/manifests/examples/microservice-http`
- `gitops/argocd/apps/example-worker-event.yaml`
  - syncs `gitops/argocd/manifests/examples/worker-event`

Example workloads:

- `gitops/argocd/manifests/examples/microservice-http/*`
  - deployment + service with `/health` and `/ready` probes
- `gitops/argocd/manifests/examples/worker-event/*`
  - worker deployment with metrics port (`9464`) and liveness probe on `/metrics`

## Standard Apply Order (first-time setup)

Apply in this order:

1. Argo CD installation in namespace `argocd`
2. IDP GitOps baseline manifests:
   - `namespaces.yaml`
   - `projects.yaml`
   - `repositories.yaml`
3. Root app (`root-app.yaml`)
4. Child apps sync and example workloads reconcile

Why this order matters:

- `projects.yaml` must exist before child apps referencing `project: idp-apps`
- `repositories.yaml` must exist so Argo CD can access the repo source

## Post-Fork Customization Checklist

Before using this in a real organization, update:

- repo URL references:
  - `gitops/argocd/app-of-apps/root-app.yaml`
  - `gitops/argocd/apps/*.yaml`
  - `gitops/argocd/manifests/repositories.yaml`
- `targetRevision` (branch/tag strategy)
- allowed destinations in `gitops/argocd/manifests/projects.yaml`
- example image references (`ghcr.io/example/...`) in example deployments
- Argo CD project allowlists (resource scopes) to match security policy

## How to Add a New App (via PR)

Recommended PR flow:

1. Add workload manifests under:
   - `gitops/argocd/manifests/examples/<app-name>/`
2. Add `kustomization.yaml` in that directory.
3. Add Argo CD child app manifest:
   - `gitops/argocd/apps/<app-name>.yaml`
4. If the app uses a new namespace:
   - add it to `gitops/argocd/manifests/namespaces.yaml`
   - add destination allowlist entry to `gitops/argocd/manifests/projects.yaml`
5. Update docs/runbooks if operational behavior is materially different.
6. Open PR with validation + rollback plan.

## Operator Validation Checklist (after sync)

Argo CD / Kubernetes checks:

- root app `goldenpath-idp-root` is `Healthy` + `Synced`
- child apps are `Healthy` + `Synced`
- namespaces exist:
  - `microservice-http`
  - `worker-event`
- deployments are available
- probes are green

Suggested commands (example):

```bash
kubectl get applications -n argocd
kubectl get ns microservice-http worker-event idp-platform
kubectl get deploy,svc -n microservice-http
kubectl get deploy -n worker-event
kubectl describe app -n argocd example-microservice-http
kubectl describe app -n argocd example-worker-event
```

## Common Failure Modes (with file-level checks)

### 1. Child app fails with project not found / destination denied

Check:

- `gitops/argocd/manifests/projects.yaml`
  - `metadata.name: idp-apps`
  - destination namespace present in `spec.destinations`
- child app manifest `spec.project` matches `idp-apps`

### 2. Repo access or source resolution errors

Check:

- `gitops/argocd/manifests/repositories.yaml`
  - repository secret exists and URL matches child app `repoURL`
- child app `targetRevision` exists (branch or tag)

### 3. Kustomize path errors / missing resources

Check:

- child app `spec.source.path`
- `kustomization.yaml` exists in target path
- referenced resource files exist and are valid

### 4. Workload syncs but app becomes `Degraded`

Check:

- example deployment image accessibility (`ghcr.io/example/...` is placeholder)
- probes and ports:
  - `microservice-http`: `/health`, `/ready`, port `3000`
  - `worker-event`: `/metrics`, port `9464`
- cluster secrets/config dependencies introduced by your customization

## Security and Governance Recommendations

- Restrict `clusterResourceWhitelist` and `namespaceResourceWhitelist` in `projects.yaml` for production.
- Use repo credentials/SSH or GitHub App auth instead of anonymous public access when applicable.
- Prefer environment-specific Argo CD projects (for example `idp-apps-dev`, `idp-apps-prod`) in larger orgs.
- Enforce PR reviews for changes under:
  - `gitops/argocd/apps/`
  - `gitops/argocd/manifests/`

## Related Docs

- `docs/en/getting-started.md`
- `docs/en/runbooks/deploy-failure.md`
- `docs/en/runbooks/rollback.md`
- `docs/en/adr/0003-gitops-argocd-app-of-apps.md`

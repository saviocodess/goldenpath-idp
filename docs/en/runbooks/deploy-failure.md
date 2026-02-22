[Português (Brasil)](../../pt-br/runbooks/deploy-failure.md) | **English**

# Runbook: Deploy Failure

## Scenario

Deployment failure in CI/CD or Argo CD (`Degraded` / persistent `OutOfSync`).

## Signals

- Pipeline fails in `build` or deploy stage
- Argo CD sync/reconciliation errors
- Error spikes in health/readiness checks

## Immediate Evidence Checklist

Collect and pin:

- failing commit SHA / tag
- affected Argo CD app name(s)
- namespace(s) and cluster/environment
- failing workflow URL
- Argo CD app event messages
- most recent deployment rollout status

## Immediate Actions

1. Freeze related merges.
2. Collect evidence:
- failing SHA
- workflow logs
- Argo CD events
3. Classify incident severity and business impact.

Suggested commands (examples):

```bash
kubectl get applications -n argocd
kubectl describe app -n argocd example-microservice-http
kubectl describe app -n argocd example-worker-event
kubectl get deploy,po,svc -n microservice-http
kubectl get deploy,po -n worker-event
kubectl rollout status deploy/example-microservice-http -n microservice-http
```

## Diagnosis

1. Inspect Argo CD app status and error details.
2. Validate rendered manifests (`kustomization`, namespace, image tag).
3. Confirm image/tag availability in registry.
4. Validate external dependencies (secrets/configmaps).
5. Confirm Argo CD project/repo permissions still match the app source/destination.

### GitOps File-Level Checks

- `gitops/argocd/manifests/projects.yaml`
  - `AppProject` `idp-apps` exists
  - destination namespace is listed in `spec.destinations`
- `gitops/argocd/manifests/repositories.yaml`
  - repo secret URL matches app `repoURL`
- `gitops/argocd/apps/*.yaml`
  - `spec.project`, `spec.source.path`, `targetRevision`, `destination.namespace`
- `gitops/argocd/manifests/examples/<app>/kustomization.yaml`
  - resources list is valid and files exist

### Probe and Port Validation (examples in this repo)

- `example-microservice-http`
  - readiness: `GET /ready` on port `3000`
  - liveness: `GET /health` on port `3000`
- `example-worker-event`
  - liveness: `GET /metrics` on port `9464`

## Mitigation

1. Config issue: create immediate corrective PR.
2. Image issue: promote last stable tag.
3. Production impact: execute rollback runbook.

## Escalation Triggers

Escalate to incident mode if any condition persists beyond your team's threshold:

- repeated sync retries without progress
- broad service degradation across multiple apps/namespaces
- rollback blocked by project/repository permission issues
- loss of observability signals during remediation

## Resolution Criteria

- App state is `Healthy` and `Synced`
- Error budget returns to baseline
- Incident record updated with preliminary root cause

## Related Docs

- `docs/en/gitops-argocd-operations.md`
- `docs/en/runbooks/rollback.md`
- `docs/en/runbooks/incident-template.md`

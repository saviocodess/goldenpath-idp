[Português (Brasil)](../../pt-br/runbooks/rollback.md) | **English**

# Runbook: Rollback

## When to Execute

- Critical regression after deployment
- API/worker contract break in production
- Sudden error or latency increase

## Preconditions

- Identify last known stable tag/SHA
- On-call owner approval
- Incident channel communication started
- Confirm rollback target still exists in Git history / image registry

## GitOps Procedure

1. Open PR reverting commit or restoring stable image tag.
2. Label PR as `rollback` and prioritize review.
3. Merge PR.
4. Monitor Argo CD synchronization.
5. Validate health/readiness and service metrics.

### File-Level Rollback Targets (this repo structure)

- Argo CD child app definitions:
  - `gitops/argocd/apps/*.yaml`
- Example manifests and images:
  - `gitops/argocd/manifests/examples/*/deployment.yaml`
  - `gitops/argocd/manifests/examples/*/kustomization.yaml`
- Argo CD project/repository baseline (less common rollback target, but possible):
  - `gitops/argocd/manifests/projects.yaml`
  - `gitops/argocd/manifests/repositories.yaml`

### Validation Commands (examples)

```bash
kubectl get applications -n argocd
kubectl describe app -n argocd example-microservice-http
kubectl describe app -n argocd example-worker-event
kubectl rollout status deploy/example-microservice-http -n microservice-http
kubectl rollout status deploy/example-worker-event -n worker-event
```

## Post-Rollback Validation

- `Argo CD: Healthy + Synced`
- Error and latency back to baseline
- Worker queue/event behavior normalized
- No follow-up permission/path errors in Argo CD events (`project`, `repo`, `path`)

## Follow-up

- Open corrective action with owner and due date
- Update runbook/ADR when process gaps are found

## Related Docs

- `docs/en/gitops-argocd-operations.md`
- `docs/en/runbooks/deploy-failure.md`
- `docs/en/runbooks/incident-template.md`

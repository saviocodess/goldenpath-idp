[Português (Brasil)](../../pt-br/runbooks/deploy-failure.md) | **English**

# Runbook: Deploy Failure

## Scenario

Deployment failure in CI/CD or Argo CD (`Degraded` / persistent `OutOfSync`).

## Signals

- Pipeline fails in `build` or deploy stage
- Argo CD sync/reconciliation errors
- Error spikes in health/readiness checks

## Immediate Actions

1. Freeze related merges.
2. Collect evidence:
- failing SHA
- workflow logs
- Argo CD events
3. Classify incident severity and business impact.

## Diagnosis

1. Inspect Argo CD app status and error details.
2. Validate rendered manifests (`kustomization`, namespace, image tag).
3. Confirm image/tag availability in registry.
4. Validate external dependencies (secrets/configmaps).

## Mitigation

1. Config issue: create immediate corrective PR.
2. Image issue: promote last stable tag.
3. Production impact: execute rollback runbook.

## Resolution Criteria

- App state is `Healthy` and `Synced`
- Error budget returns to baseline
- Incident record updated with preliminary root cause

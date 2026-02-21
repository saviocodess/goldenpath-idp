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

## GitOps Procedure

1. Open PR reverting commit or restoring stable image tag.
2. Label PR as `rollback` and prioritize review.
3. Merge PR.
4. Monitor Argo CD synchronization.
5. Validate health/readiness and service metrics.

## Post-Rollback Validation

- `Argo CD: Healthy + Synced`
- Error and latency back to baseline
- Worker queue/event behavior normalized

## Follow-up

- Open corrective action with owner and due date
- Update runbook/ADR when process gaps are found

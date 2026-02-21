[Português (Brasil)](../../pt-br/standards/ownership-and-oncall.md) | **English**

# Standard: Ownership and On-call

## Objective

Guarantee explicit responsibility for service lifecycle and incident operations.

## Required Ownership

- `catalog-info.yaml` must define `spec.owner`
- `CODEOWNERS` must cover critical paths
- Every service must define responsible team and support channel

## On-call Expectations

- Production services require active rotation
- Runbooks are mandatory for common incidents
- Incident records must capture timeline, impact, and actions

## Operational Metrics

- MTTR
- incident rate per service
- rollback recovery time

## Escalation

- Severity based on business impact
- Clear escalation triggers for technical leadership

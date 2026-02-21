[Português (Brasil)](../pt-br/threat-model.md) | **English**

# Threat Model - GoldenPath IDP

Reference date: 2026-02-21

## Scope

- Service templates and skeletons
- GitHub publication flow
- CI/CD pipelines
- Declarative GitOps delivery via Argo CD

## Critical Assets

- Source code and Git history
- Integration secrets (tokens/deploy keys)
- CI infrastructure and runners
- Kubernetes cluster and namespaces

## Trust Boundaries

- Developer workstation -> GitHub
- GitHub Actions -> registry/artifacts
- Argo CD -> Kubernetes API
- Runtime service -> observability/messaging stack

## Main Threats (STRIDE)

### Spoofing

- Service identity spoofing due to leaked credentials.
- Mitigation:
  - secret rotation
  - least privilege
  - short-lived credentials

### Tampering

- Malicious changes in manifests/templates through weak review flow.
- Mitigation:
  - branch protection
  - CODEOWNERS
  - mandatory reviews

### Repudiation

- Lack of auditable trace for deployment changes.
- Mitigation:
  - PR-based GitOps
  - release changelog
  - incident tracking

### Information Disclosure

- Secrets exposed in code or logs.
- Mitigation:
  - secret scanning
  - secure logging policy
  - security review in PRs

### Denial of Service

- Failing health/readiness causing crash loops.
- Mitigation:
  - health check contracts
  - rollback/failure runbooks
  - latency/error monitoring

### Elevation of Privilege

- Over-privileged service accounts.
- Mitigation:
  - restrictive RBAC
  - scoped AppProject configuration
  - namespace isolation

## Residual Risks

- Misconfigured external integrations
- Human error during off-hours incident response

## Evolution Plan

- Artifact provenance/signing
- policy-as-code validations
- template compliance scoring automation

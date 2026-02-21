[Português (Brasil)](../../pt-br/adr/0003-gitops-argocd-app-of-apps.md) | **English**

# ADR 0003: GitOps with Argo CD App-of-Apps

Status: Accepted
Date: 2026-02-21

## Context

Teams require auditable deployment and predictable rollback for services generated through Golden Paths.

## Decision

Adopt Argo CD with app-of-apps:

- `root-app` targets `gitops/argocd/apps`
- each child application targets dedicated Kustomize manifests

## Alternatives Considered

1. Imperative CI-driven deployment only.
2. Single monolithic Argo CD application for all services.
3. Another GitOps model without equivalent declarative hierarchy.

## Consequences

### Positive

- PR-based governance and traceability
- simplified rollback by commit/tag
- clear app-level isolation

### Negative

- Argo CD learning curve
- need for robust AppProject and RBAC management

[Português (Brasil)](../../pt-br/adr/0001-idp-scope-and-non-goals.md) | **English**

# ADR 0001: IDP Scope and Non-Goals

Status: Accepted
Date: 2026-02-21

## Context

The organization needs to reduce service setup time and engineering variability across squads. Without platform standards, teams duplicate infrastructure, observability, and CI/CD work.

## Decision

Establish a Golden Path-focused IDP repository with two initial templates (`microservice-http` and `worker-event`), mandatory standards, runbooks, and GitOps references.

## Alternatives Considered

1. Keep fully autonomous team-by-team setup.
2. Provide documentation only without executable templates.
3. Use one generic template for all service profiles.

## Consequences

### Positive

- reduced lead time for new services
- higher operational consistency
- baseline for platform governance

### Negative

- continuous template maintenance effort
- potential initial resistance from teams

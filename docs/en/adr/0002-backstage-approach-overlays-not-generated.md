[Português (Brasil)](../../pt-br/adr/0002-backstage-approach-overlays-not-generated.md) | **English**

# ADR 0002: Backstage via Overlays, Not Generated in This Repo

Status: Accepted
Date: 2026-02-21

## Context

This repository runs in a constrained environment where heavy bootstrap is not allowed, but realistic Backstage integration remains mandatory.

## Decision

Store only Backstage overlays and Scaffolder templates in this repository. Do not version a full Backstage runtime here.

## Alternatives Considered

1. Commit a full Backstage application into this repository.
2. Skip Backstage integration and keep templates manual.
3. Create automated bootstrap scripts for CI execution.

## Consequences

### Positive

- lightweight repository focused on platform assets
- reusable across different Backstage instances

### Negative

- requires overlay application in a real environment
- setup quality depends on documentation discipline

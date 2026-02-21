[Português (Brasil)](../../pt-br/adr/0004-templates-design-contract.md) | **English**

# ADR 0004: Template Design Contract

Status: Accepted
Date: 2026-02-21

## Context

Without a formal contract, templates evolve inconsistently and increase platform support cost.

## Decision

Define a mandatory template contract in `docs/en/standards/golden-path-contracts.md` covering:

- catalog and ownership metadata
- operational README
- minimal CI contract
- observability and health checks

## Alternatives Considered

1. Implicit contract via code examples only.
2. Fully flexible contracts by template owner.
3. PR checklist-only governance without a formal standard.

## Consequences

### Positive

- predictable scaffolder output
- lower long-term platform support cost

### Negative

- stricter contribution bar for new templates

[Português (Brasil)](CONTRIBUTING.pt-BR.md) | **English**

# Contributing

Thank you for contributing to `goldenpath-idp`.

## Contribution Workflow

1. Open an issue with context, impact, and proposed approach.
2. Create a branch using `type/scope-description` (example: `feat/templates-worker-dlq`).
3. Keep commits small and use Conventional Commits.
4. Update affected docs (`docs/en`, `docs/pt-br`, runbooks, standards, ADRs).
5. Open a pull request using the template and include risk, rollback, and validation plan.

## Minimum Pull Request Requirements

- Change aligns with Golden Path contracts.
- Lightweight validation performed with `make check`.
- No credentials, secrets, or private tokens in code/history.
- Ownership references updated when needed (`catalog-info.yaml`, `CODEOWNERS`).
- Documentation parity maintained between EN and PT-BR.

## Review Policy

- Template-related PRs require platform review.
- Security-impacting PRs require at least one technical owner review.
- Architectural changes require ADR updates.

## Commit Convention

Use Conventional Commits:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `ci: ...`
- `chore: ...`

## Code of Collaboration

- Be precise and factual in technical discussions.
- Prefer explicit trade-offs over implicit assumptions.
- Preserve operational safety and backward compatibility when possible.

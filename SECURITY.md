[Português (Brasil)](SECURITY.pt-BR.md) | **English**

# Security Policy

## Reporting a Vulnerability

Please report vulnerabilities privately through GitHub Security Advisory.

Include:

- attack vector
- expected impact
- affected repositories/paths
- minimum reproducible evidence

## Response SLA

- Initial triage: up to 2 business days
- Mitigation plan: up to 5 business days
- Coordinated fix/disclosure: based on severity

## Security Baseline

- Never publish functional exploit details in public issues.
- Never expose credentials, tokens, or sensitive data in logs/PRs.
- Follow `docs/en/standards/security-baseline.md`.
- Use `docs/en/threat-model.md` for threat and control references.

## GitHub Security Features (Repository Setup)

- Enable GitHub Dependency Graph in repository settings so Dependabot and dependency review can evaluate changes.
- This repository gates the `dependency-review` workflow job behind the repository variable `ENABLE_DEPENDENCY_REVIEW=true`
  to avoid false failures when dependency graph is not enabled yet.
- Keep `.github/dependabot.yml` active and review update PRs with the same standards (risk, rollback, docs impact).

## Supported Versions

This repository currently supports the latest `main` branch for security updates.

[Português (Brasil)](../../pt-br/standards/security-baseline.md) | **English**

# Standard: Security Baseline

## Objective

Define minimum security controls for services, pipelines, and repository operations.

## Secrets

- Never commit secrets
- Use runtime secret management
- Rotate credentials regularly

## Dependencies

- Enable Dependabot updates
- Review critical CVEs before merge
- Avoid unmaintained packages

## Least Privilege

- Restrict service accounts to minimal scope
- Use short-lived and scoped tokens
- Isolate environments by namespace/project

## Supply Chain Controls

- Dependency review in pull requests
- Static checks and secret scanning
- Traceable releases and audit trail

## Secure Logging

- Redact PII and credentials
- Never log tokens, cookies, or passwords

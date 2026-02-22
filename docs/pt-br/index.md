**Português (Brasil)** | [English](../en/index.md)

# Documentação GoldenPath IDP (PT-BR)

Esta seção concentra a documentação completa em português para arquitetura de plataforma, governança, runbooks e padrões operacionais.

## Comece por Aqui

- [Getting Started (Uso Real)](getting-started.md)
- [FAQ](faq.md)
- [Glossário](glossary.md)

## Trilhas de Leitura (por público)

- Platform Engineer / DevEx Engineer:
  - `getting-started.md`
  - `standards/golden-path-contracts.md`
  - `adr/0004-templates-design-contract.md`
  - `runbooks/deploy-failure.md`
- Engineering Manager / Head of Engineering:
  - `getting-started.md`
  - `adr/0001-idp-scope-and-non-goals.md`
  - `adr/0003-gitops-argocd-app-of-apps.md`
  - `standards/ci-cd.md`
  - `threat-model.md`
- Recrutador / Hiring Manager:
  - `getting-started.md` (seções 1, 2, 8)
  - `faq.md`
  - `adr/0001-idp-scope-and-non-goals.md`
  - `runbooks/incident-template.md`

## Decisões de Arquitetura

- [ADR 0001 - Escopo do IDP e Não Objetivos](adr/0001-idp-scope-and-non-goals.md)
- [ADR 0002 - Abordagem Backstage por Overlays](adr/0002-backstage-approach-overlays-not-generated.md)
- [ADR 0003 - GitOps com Argo CD App-of-Apps](adr/0003-gitops-argocd-app-of-apps.md)
- [ADR 0004 - Contrato de Design dos Templates](adr/0004-templates-design-contract.md)
- [ADR 0005 - Padrão de Observabilidade com OpenTelemetry](adr/0005-standards-observability-opentelemetry.md)

## Padrões de Engenharia

- [Logging](standards/logging.md)
- [Observabilidade OpenTelemetry](standards/observability-otel.md)
- [Health Checks](standards/health-checks.md)
- [CI/CD](standards/ci-cd.md)
- [Baseline de Segurança](standards/security-baseline.md)
- [Ownership e On-call](standards/ownership-and-oncall.md)
- [Contratos de Golden Path](standards/golden-path-contracts.md)

## Runbooks

- [Falha de Deploy](runbooks/deploy-failure.md)
- [Rollback](runbooks/rollback.md)
- [Troubleshooting de Catálogo Backstage](runbooks/backstage-catalog-troubleshooting.md)
- [Template de Incidente](runbooks/incident-template.md)

## Risco e Demo

- [Threat Model](threat-model.md)
- [Roteiro de Demo](demo-script.md)

## Notas de Manutenção da Documentação

- Os arquivos EN/PT-BR são mantidos em paths espelhados (`docs/en/...` e `docs/pt-br/...`).
- Mantenha os links de troca de idioma nas primeiras linhas de cada documento.
- Use `make check` antes de abrir PRs para validar paridade, links e formatação.

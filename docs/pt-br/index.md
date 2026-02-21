**Português (Brasil)** | [English](../en/index.md)

# Documentação GoldenPath IDP (PT-BR)

Esta seção concentra a documentação completa em português para arquitetura de plataforma, governança, runbooks e padrões operacionais.

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

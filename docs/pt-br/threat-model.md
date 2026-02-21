**Português (Brasil)** | [English](../en/threat-model.md)

# Threat Model - GoldenPath IDP

Data de referência: 2026-02-21

## Escopo

- Templates e skeletons de serviços
- Fluxo de publicação no GitHub
- Pipelines de CI/CD
- Entrega declarativa GitOps via Argo CD

## Ativos Críticos

- Código-fonte e histórico Git
- Segredos de integração (tokens/deploy keys)
- Infra de CI e runners
- Cluster Kubernetes e namespaces

## Fronteiras de Confiança

- Workstation do dev -> GitHub
- GitHub Actions -> registry/artefatos
- Argo CD -> API do Kubernetes
- Serviço em runtime -> stack de observabilidade/mensageria

## Principais Ameaças (STRIDE)

### Spoofing

- Falsificação de identidade de serviço por credencial vazada.
- Mitigação:
  - rotação de segredos
  - menor privilégio
  - credenciais de curta duração

### Tampering

- Alteração maliciosa de manifests/templates por fluxo de revisão frágil.
- Mitigação:
  - branch protection
  - CODEOWNERS
  - revisão obrigatória

### Repudiation

- Falta de trilha auditável para mudanças de deploy.
- Mitigação:
  - GitOps via PR
  - changelog de release
  - rastreio de incidentes

### Information Disclosure

- Segredos expostos em código ou logs.
- Mitigação:
  - secret scanning
  - política de logging seguro
  - revisão de segurança em PRs

### Denial of Service

- Falha de health/readiness causando crash loops.
- Mitigação:
  - contratos de health check
  - runbooks de rollback/falha
  - monitoramento de erro/latência

### Elevation of Privilege

- Service accounts com privilégio excessivo.
- Mitigação:
  - RBAC restritivo
  - AppProject com escopo controlado
  - isolamento por namespace

## Riscos Residuais

- Configuração incorreta de integrações externas
- Erro humano em incidentes fora do horário comercial

## Plano de Evolução

- Provenance/assinatura de artefatos
- validações policy-as-code
- automação de score de conformidade de templates

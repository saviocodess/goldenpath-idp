# Threat Model - GoldenPath IDP

Data de referência: 2026-02-21

## Escopo

- Templates e skeletons de serviços
- Fluxo de publicação em repositórios GitHub
- Pipeline de CI/CD
- Entrega declarativa via Argo CD

## Ativos críticos

- Código-fonte e histórico Git
- Segredos de integração (tokens, deploy keys)
- Infra de CI e runners
- Cluster Kubernetes e namespace de apps

## Fronteiras de confiança

- Desenvolvedor local -> GitHub
- GitHub Actions -> Registry/artefatos
- Argo CD -> Kubernetes API
- Serviço em runtime -> observabilidade/filas

## Ameaças principais (STRIDE)

### Spoofing

- Falsificação de identidade de serviço por credenciais vazadas.
- Mitigação:
  - rotação de segredos
  - least privilege
  - tokens com expiração curta

### Tampering

- Alteração maliciosa de manifests/template via PR não revisado.
- Mitigação:
  - branch protection
  - CODEOWNERS
  - revisão obrigatória

### Repudiation

- Falta de trilha auditável em mudanças de deploy.
- Mitigação:
  - GitOps via PR
  - changelog por release
  - registro de incidentes

### Information Disclosure

- Exposição de segredos em logs ou código.
- Mitigação:
  - secret scanning
  - política de logging seguro
  - revisão de segurança em PR

### Denial of Service

- Falhas de readiness/health gerando reinícios contínuos.
- Mitigação:
  - contratos de health check
  - runbooks de falha e rollback
  - monitoramento de erro/latência

### Elevation of Privilege

- Service account com privilégios excessivos.
- Mitigação:
  - RBAC restritivo
  - AppProject com destinos/sources controlados
  - segregação por namespace

## Riscos residuais

- Dependência de configuração correta de integrações externas
- Erros humanos em operação de incidentes fora de horário

## Plano de evolução

- Adotar assinaturas/provenance de artefatos
- Expandir validações policy-as-code
- Automatizar score de conformidade por template

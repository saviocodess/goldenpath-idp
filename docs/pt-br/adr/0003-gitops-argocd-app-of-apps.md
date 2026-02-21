**Português (Brasil)** | [English](../../en/adr/0003-gitops-argocd-app-of-apps.md)

# ADR 0003: GitOps com Argo CD no Padrão App-of-Apps

Status: Accepted
Data: 2026-02-21

## Contexto

Os times precisam de deploy auditável e rollback previsível para serviços gerados por Golden Paths.

## Decisão

Adotar Argo CD com app-of-apps:

- `root-app` aponta para `gitops/argocd/apps`
- cada aplicação filha aponta para manifests Kustomize dedicados

## Alternativas Consideradas

1. Deploy somente imperativo via CI.
2. Uma aplicação Argo CD monolítica para todos os serviços.
3. Outro modelo GitOps sem hierarquia declarativa equivalente.

## Consequências

### Positivas

- governança por PR e rastreabilidade
- rollback simplificado por commit/tag
- isolamento claro por aplicação

### Negativas

- curva de aprendizado de Argo CD
- necessidade de gestão robusta de AppProject e RBAC

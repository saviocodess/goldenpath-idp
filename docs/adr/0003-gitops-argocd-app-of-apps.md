# ADR 0003: GitOps com Argo CD no Padrão App-of-Apps

Status: Accepted
Data: 2026-02-21

## Contexto

Times precisam de rastreabilidade e rollback previsível para deploys de serviços gerados por Golden Paths.

## Decisão

Adotar Argo CD com app-of-apps:

- `root-app` referencia `gitops/argocd/apps`
- cada Application filha referencia manifests Kustomize específicos

## Alternativas consideradas

1. Deploy imperativo via pipeline CI (sem GitOps).
2. Um único Application monolítico para todos os apps.
3. GitOps em outra ferramenta sem padrão declarativo equivalente.

## Consequências

- Positivas:
  - governança por PR e auditoria de mudanças
  - rollback simplificado por commit/tag
  - separação clara entre apps
- Negativas:
  - curva de aprendizado do Argo CD
  - necessidade de operar AppProject e permissões corretamente

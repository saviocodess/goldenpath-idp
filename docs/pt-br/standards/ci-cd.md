**Português (Brasil)** | [English](../../en/standards/ci-cd.md)

# Standard: CI/CD

## Objetivo

Garantir entrega previsível, auditável e com gates de qualidade para serviços gerados pela plataforma.

## Gates Obrigatórios por Pull Request

- `lint`
- `typecheck`
- `unit tests`
- `build`
- checks de segurança (quando habilitados)

Nenhum merge em `main` deve ocorrer sem todos os gates obrigatórios verdes.

## Proteção de Branch

- Pull request obrigatório para `main`
- Ao menos uma revisão de owner técnico
- Status checks obrigatórios
- Bloqueio de merge desatualizado quando houver conflito

## Instalação de Dependências no CI

- Instalar dependências somente uma vez por job
- Se existir `yarn.lock`: `yarn install --immutable`
- Se não existir `yarn.lock`: `yarn install`
- PRs que alteram dependências devem incluir lockfile nos serviços gerados

## Versionamento e Release

- Tags semânticas: `vMAJOR.MINOR.PATCH`
- Mudanças breaking devem incrementar `MAJOR`
- Release notes alinhadas com `CHANGELOG.md`

## Deploy e Rollback

- Deploy apenas via GitOps (PR + merge + sync Argo CD)
- Rollback por PR de reversão/ajuste, não por mudança manual ad-hoc
- Seguir runbooks em `docs/pt-br/runbooks`

## Métricas de Pipeline

- lead time de PR
- taxa de falha de pipeline
- tempo médio de restauração após rollback

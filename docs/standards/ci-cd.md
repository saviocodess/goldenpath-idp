# Standard: CI/CD

## Objetivo

Garantir que todo serviço criado pela plataforma tenha entrega previsível, auditável e com qualidade mínima antes de chegar em produção.

## Gates obrigatórios por Pull Request

- `lint`
- `typecheck`
- `unit tests`
- `build`
- security checks (quando habilitados no repositório)

Sem esses gates em estado verde, merge em `main` não deve ocorrer.

## Regras de branch protection

- Exigir PR para merge em `main`
- Exigir ao menos 1 revisão de owner técnico
- Exigir status checks obrigatórios
- Bloquear merge com branches desatualizadas quando houver conflito

## Instalação de dependências no CI

- Instalar dependências uma única vez por job
- Se `yarn.lock` existir: `yarn install --immutable`
- Se `yarn.lock` não existir: `yarn install`
- PRs que alteram dependências devem incluir lockfile no serviço gerado

## Estratégia de versionamento

- Tags semânticas: `vMAJOR.MINOR.PATCH`
- Mudanças breaking exigem incremento de `MAJOR`
- Release deve atualizar `CHANGELOG.md`

## Estratégia de release

- Trigger principal por tag `v*`
- Publicar release notes com referência ao changelog
- Publicar artefatos de documentação e evidências de entrega

## Deploy e rollback

- Deploy sempre via GitOps (merge em `main` + sync Argo CD)
- Rollback deve ser feito por PR de reversão (sem ação manual fora do fluxo)
- Incidentes devem seguir `docs/runbooks/rollback.md` e `docs/runbooks/incident-template.md`

## Métricas mínimas de pipeline

- Lead time de PR para merge
- Taxa de falha de pipeline
- Tempo médio de restauração após rollback

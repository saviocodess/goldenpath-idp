**Português (Brasil)** | [English](../en/faq.md)

# FAQ (PT-BR)

## Este repositório é um produto completo ou uma base de referência pronta para produção?

É uma base de referência orientada a produção. O repositório inclui templates reais, manifests GitOps e padrões,
mas cada empresa deve customizar ownership, URLs de repositório, ambientes e controles de segurança antes do rollout.

## Posso usar os templates sem Backstage?

Sim. Os templates foram desenhados para o Backstage Scaffolder, mas os skeletons em `templates/*/skeleton` também podem
ser usados diretamente como ponto de partida manual.

## Posso usar os manifests GitOps sem Argo CD app-of-apps?

Sim. Os exemplos estão estruturados para Argo CD app-of-apps, mas os manifests podem ser adaptados para `kubectl apply`,
pipelines com Kustomize ou outro controlador GitOps.

## Por que não existem lockfiles commitados na raiz do repositório?

Este repositório foi desenhado para permanecer leve e amigável a bootstrap em ambientes restritos.
As instruções de instalação estão documentadas, e lockfiles podem ser gerados em máquinas reais de desenvolvimento.

## Por que `dependency-review` fica `skipped` em alguns runs?

O job é condicionado à variável de repositório `ENABLE_DEPENDENCY_REVIEW=true` e depende do GitHub Dependency Graph.
Isso evita falsos erros antes de as configurações de segurança do repositório estarem totalmente habilitadas.

## O que devo customizar primeiro após fazer fork?

- URLs de org/repo GitHub nas locations do Backstage e manifests dos apps Argo CD
- entidades de ownership (`group:default/...`) e `catalog-info.yaml`
- namespaces/projects/repositories específicos do ambiente nos manifests do Argo CD
- baseline de segurança e gates de CI alinhados à sua organização

## Qual o caminho mínimo para demonstrar valor rapidamente?

1. Rodar `make check`
2. Registrar templates no Backstage
3. Gerar um serviço usando `microservice-http`
4. Aplicar root app do Argo CD e sincronizar apps de exemplo
5. Revisar um runbook e um ADR com o time

## Como adicionar um novo Golden Path?

Siga as referências de design e governança:

- `docs/pt-br/standards/golden-path-contracts.md`
- `docs/pt-br/adr/0004-templates-design-contract.md`

Depois adicione:

- skeleton do template em `templates/<novo-path>/skeleton`
- template do Backstage em `backstage/overlays/scaffolder/templates/`
- manifests GitOps de exemplo (opcional) em `gitops/argocd/manifests/examples/`
- atualização de documentação em EN/PT-BR

## Este repositório é útil para entrevistas e avaliações técnicas?

Sim. Ele expõe intencionalmente decisões de arquitetura, padrões, runbooks operacionais, design GitOps e workflows de
CI/segurança para que avaliadores analisem raciocínio técnico além de snippets de código.

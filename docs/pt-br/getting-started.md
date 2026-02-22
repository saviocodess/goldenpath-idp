**Português (Brasil)** | [English](../en/getting-started.md)

# Getting Started (Uso Real)

Este guia é para engenheiros que querem clonar este repositório e usá-lo como base real para:

- Golden Paths no Backstage
- GitOps com Argo CD app-of-apps
- padrões de engenharia e runbooks operacionais

## 1. Pré-requisitos (máquina real)

Rode o preflight leve:

```bash
bash scripts/preflight-tools.sh
```

Ferramentas recomendadas por cenário:

- Validação do repositório: `bash`, `git`, `node`, `corepack` (ou `yarn`)
- Bootstrap do Backstage: `node`, `corepack`/`yarn`, `npx`
- Demo GitOps em cluster local: `docker`, `kind`, `kubectl`, `helm`
- Publicação/operação no GitHub: `gh` (opcional, mas recomendado)

## 2. Clonar e validar o repositório

```bash
git clone https://github.com/saviocodess/goldenpath-idp.git
cd goldenpath-idp
make check
```

O que `make check` valida:

- dependências duplicadas em `package.json` dos templates
- higiene de whitespace em YAML/Markdown
- paridade de documentação EN/PT-BR
- sintaxe de scripts shell
- links locais em Markdown

Critérios de sucesso desta etapa:

- todos os checks estáticos passam localmente
- não há pares de documentação bilíngue faltando
- não há referências locais quebradas em Markdown

## 3. Bootstrap do Backstage e overlays (ambiente real)

Gere o Backstage em uma máquina com espaço/rede suficientes:

```bash
npx @backstage/create-app@latest
```

Depois aplique os overlays deste repositório (veja `backstage/README.md`):

- faça merge de `backstage/overlays/app-config.overlay.yaml` no `app-config.yaml` do Backstage
- registre `backstage/overlays/catalog/locations.yaml`
- confirme que os templates aparecem no Scaffolder:
  - `microservice-http`
  - `worker-event`

Validação rápida após aplicar os overlays:

- Backstage sobe sem erros de catálogo/scaffolder
- location `goldenpath-idp-locations` está acessível
- templates renderizam formulários no UI do Scaffolder

## 4. Gerar um serviço via Golden Path

No Scaffolder do Backstage, informe:

- nome do serviço (`kebab-case`)
- entidade owner (por exemplo `group:default/platform-team`)
- repositório GitHub de destino

Os repositórios gerados incluem:

- runtime Node.js + TypeScript
- skeleton de workflow de CI
- logging, health checks / métricas
- pontos de bootstrap OpenTelemetry
- Dockerfile e Makefile local

## 5. Rodar serviços gerados localmente

Fluxo de exemplo (repositório gerado):

```bash
corepack enable
cp .env.example .env
yarn install
yarn verify
yarn build
yarn start
```

Notas por template:

- `microservice-http`: endpoints de health `/health` e `/ready`
- `worker-event`: servidor de métricas opcional com `METRICS_PORT=9464`, expondo `/metrics` e `/health`

Smoke checks locais sugeridos (repositório gerado):

- `microservice-http`:
  - `curl -s http://localhost:3000/health`
  - `curl -s http://localhost:3000/ready`
- `worker-event` (com `METRICS_PORT=9464`):
  - `curl -s http://localhost:9464/health`
  - `curl -s http://localhost:9464/metrics`

## 6. GitOps com Argo CD (app-of-apps)

Este repositório inclui manifests base prontos do Argo CD e apps de exemplo.

Aplique em ordem (fora deste ambiente restrito):

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl apply -f gitops/argocd/manifests/namespaces.yaml
kubectl apply -f gitops/argocd/manifests/projects.yaml
kubectl apply -f gitops/argocd/manifests/repositories.yaml
kubectl apply -f gitops/argocd/app-of-apps/root-app.yaml
```

Depois verifique:

- aplicação raiz `goldenpath-idp-root` saudável
- apps filhas `example-microservice-http` e `example-worker-event` sincronizando com sucesso
- namespaces de exemplo (`microservice-http`, `worker-event`) existentes

## 7.1 Erros comuns no primeiro dia (e correções)

- `make check` falha porque `node` não está instalado:
  - rode `bash scripts/preflight-tools.sh`
  - instale Node + Corepack/Yarn na sua máquina
- Templates do Backstage não aparecem:
  - confirme que a URL de `locations.yaml` está acessível pelo Backstage
  - revise `docs/pt-br/runbooks/backstage-catalog-troubleshooting.md`
- Apps no Argo CD ficam `OutOfSync`:
  - confirme `repoURL`, `targetRevision` e `path` em `gitops/argocd/apps/*.yaml`
  - revise `docs/pt-br/runbooks/deploy-failure.md` e `docs/pt-br/runbooks/rollback.md`

## 7. Configurações recomendadas no GitHub

Para habilitar toda a automação de segurança:

- habilite o Dependency Graph nas configurações do repositório
- defina a variável `ENABLE_DEPENDENCY_REVIEW=true`
- opcionalmente defina `ENABLE_FULL_CI=true` para rodar install/lint/test/build no CI raiz

## 8. Checklist da primeira demo

- `make check` passa
- templates do Backstage registrados
- um serviço gerado pelo Scaffolder
- root app do Argo CD sincronizado
- saúde dos apps de exemplo validada no cluster
- links de docs e runbooks revisados pelo time

## Documentos relacionados

- [FAQ](faq.md)
- [Glossário](glossary.md)
- [Threat Model](threat-model.md)

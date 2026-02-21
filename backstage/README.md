# Backstage Overlays

Este diretório contém overlays para integrar os Golden Paths no Backstage sem gerar o app neste ambiente restrito.

## Pré-requisito (em máquina real)

Neste ambiente **não** é permitido executar bootstrap pesado. Em uma máquina com espaço/disco adequados:

```bash
npx @backstage/create-app@latest
```

## Como aplicar os overlays

1. Gere o Backstage em máquina real.
2. Copie os arquivos de `backstage/overlays/` para o repositório Backstage gerado, preservando estrutura.
3. Mescle o conteúdo de `backstage/overlays/app-config.overlay.yaml` no `app-config.yaml` do Backstage.
4. Confirme que as entidades de catálogo em `backstage/overlays/catalog/locations.yaml` estão registradas.
5. Reinicie Backstage e valide templates no Scaffolder.

## Registro de templates e catálogo

- `catalog/locations.yaml` registra locations para templates e entidades de sistema.
- `scaffolder/templates/*.yaml` define os dois Golden Paths:
  - `microservice-http`
  - `worker-event`

## Observação importante

Os templates apontam para os skeletons no GitHub deste repositório. Se você fizer fork/clone para outra organização, atualize as URLs dos templates.

**Português (Brasil)** | [English](README.md)

# Backstage Overlays

Este diretório contém overlays para integrar os Golden Paths em uma instância Backstage existente sem gerar o app do Backstage neste workspace restrito.

## Pré-requisito (máquina real)

Em uma máquina com capacidade adequada de disco/rede:

```bash
npx @backstage/create-app@latest
```

## Como aplicar overlays

1. Gere o Backstage em ambiente real.
2. Copie os arquivos de `backstage/overlays/` preservando os paths.
3. Mescle `backstage/overlays/app-config.overlay.yaml` no `app-config.yaml` do Backstage.
4. Garanta que as entidades em `backstage/overlays/catalog/locations.yaml` estejam acessíveis.
5. Reinicie o Backstage e valide os templates no Scaffolder.

## Registro de catálogo e templates

- `catalog/locations.yaml` registra as locations principais de templates e sistema.
- `scaffolder/templates/*.yaml` define dois Golden Paths:
  - `microservice-http`
  - `worker-event`

## Observação importante

As URLs dos templates referenciam este repositório. Se você usar fork/outra organização, atualize as URLs.

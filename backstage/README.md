[Português (Brasil)](README.pt-BR.md) | **English**

# Backstage Overlays

This directory contains overlays to integrate Golden Paths into an existing Backstage instance without generating the Backstage app in this constrained workspace.

## Prerequisite (real machine)

In a machine with proper disk/network capacity:

```bash
npx @backstage/create-app@latest
```

## How to apply overlays

1. Generate Backstage in a real environment.
2. Copy files from `backstage/overlays/` preserving paths.
3. Merge `backstage/overlays/app-config.overlay.yaml` into Backstage `app-config.yaml`.
4. Ensure catalog entities in `backstage/overlays/catalog/locations.yaml` are reachable.
5. Restart Backstage and validate templates in Scaffolder.

## Catalog and templates registration

- `catalog/locations.yaml` registers main template and system locations.
- `scaffolder/templates/*.yaml` defines two Golden Paths:
  - `microservice-http`
  - `worker-event`

## Important note

Template URLs reference this repository. If you use a fork/another organization, update the URLs accordingly.

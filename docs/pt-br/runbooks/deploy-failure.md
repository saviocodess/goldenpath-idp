**Português (Brasil)** | [English](../../en/runbooks/deploy-failure.md)

# Runbook: Deploy Failure

## Cenário

Falha de deploy no CI/CD ou Argo CD (`Degraded` / `OutOfSync` persistente).

## Sinais

- Pipeline falha em `build` ou etapa de deploy
- Erros de sync/reconciliation no Argo CD
- Pico de erro em health/readiness

## Ações Imediatas

1. Congelar merges relacionados.
2. Coletar evidências:
- SHA com falha
- logs do workflow
- eventos do Argo CD
3. Classificar severidade e impacto de negócio.

## Diagnóstico

1. Inspecionar status e erros da app no Argo CD.
2. Validar manifests renderizados (`kustomization`, namespace, image tag).
3. Confirmar disponibilidade da imagem/tag no registry.
4. Validar dependências externas (secrets/configmaps).

## Mitigação

1. Erro de configuração: abrir PR corretiva imediata.
2. Erro de imagem: promover última tag estável.
3. Impacto em produção: executar runbook de rollback.

## Critérios de Resolução

- Estado da app em `Healthy` e `Synced`
- Budget de erro retorna ao baseline
- Registro do incidente atualizado com causa raiz preliminar

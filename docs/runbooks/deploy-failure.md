# Runbook: Deploy Failure

## Cenário

Falha no deploy detectada no pipeline ou no Argo CD (status `Degraded` ou `OutOfSync` persistente).

## Sinais

- Pipeline falha em `build` ou `deploy`.
- Argo CD com erro de sync/reconciliation.
- Aumento de erros em `/health` ou readiness.

## Ações imediatas

1. Congelar merges relacionados ao serviço afetado.
2. Coletar evidências:
- SHA da alteração
- logs do workflow
- eventos do Argo CD
3. Classificar severidade e impacto de negócio.

## Diagnóstico

1. Verificar status da aplicação no Argo CD e mensagens de erro.
2. Validar manifests renderizados (`kustomization`, namespace, image tag).
3. Confirmar existência de imagem/tag no registry.
4. Validar dependências externas (secret/configmap).

## Mitigação

1. Se erro de configuração: abrir PR de correção imediata.
2. Se erro de imagem: promover última tag estável.
3. Se indisponibilidade em produção: executar rollback (ver runbook `rollback.md`).

## Critério de resolução

- Aplicação em estado `Healthy` e `Synced`.
- SLO de erro retornando ao baseline.
- Registro de incidente atualizado com causa raiz preliminar.

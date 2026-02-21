# Runbook: Backstage Catalog Troubleshooting

## Cenário

Templates/entidades não aparecem no catálogo ou no Scaffolder.

## Checklist rápido

1. Confirmar URL de `catalog.locations` em `app-config.yaml`.
2. Validar acessibilidade HTTP dos arquivos `raw.githubusercontent.com`.
3. Verificar sintaxe YAML das entidades.
4. Confirmar permissões de integração com GitHub.

## Diagnóstico detalhado

1. Revisar logs do backend Backstage para erros de ingestão.
2. Reprocessar location no catálogo.
3. Validar `apiVersion`, `kind` e `metadata.name` nas entidades.
4. Verificar se template está em `scaffolder.backstage.io/v1beta3`.

## Erros comuns

- URL de location apontando para `blob` em vez de `raw`.
- Entidade inválida por campos obrigatórios ausentes.
- Token de integração expirado.

## Mitigação

- Corrigir path e URL no overlay.
- Aplicar PR com ajuste de entidade/template.
- Recarregar catálogo e validar novamente.

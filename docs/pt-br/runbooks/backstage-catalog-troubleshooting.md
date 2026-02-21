**Português (Brasil)** | [English](../../en/runbooks/backstage-catalog-troubleshooting.md)

# Runbook: Backstage Catalog Troubleshooting

## Cenário

Templates ou entidades não aparecem no catálogo/Scaffolder do Backstage.

## Checklist Rápido

1. Validar `catalog.locations` na configuração do Backstage.
2. Validar acessibilidade HTTP dos assets em `raw.githubusercontent.com`.
3. Validar sintaxe YAML das entidades.
4. Validar permissões/tokens da integração com GitHub.

## Diagnóstico Detalhado

1. Inspecionar logs do backend do Backstage para erros de ingestão.
2. Reprocessar a location no catálogo.
3. Validar `apiVersion`, `kind` e `metadata.name`.
4. Confirmar versão da API de template (`scaffolder.backstage.io/v1beta3`).

## Erros Comuns

- URL apontando para `blob` em vez de `raw`
- schema de entidade inválido/campos obrigatórios ausentes
- token de integração expirado

## Mitigação

- Corrigir URLs/paths de location
- Abrir PR com ajuste de entidade/template
- Recarregar catálogo e revalidar

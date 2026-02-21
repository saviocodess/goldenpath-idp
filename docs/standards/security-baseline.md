# Standard: Security Baseline

## Objetivo

Definir controles mínimos de segurança para serviços e pipelines gerados.

## Segredos

- Nunca commitar segredos
- Usar secret manager/plataforma de runtime
- Rotacionar credenciais com janela definida

## Dependências

- Habilitar Dependabot para atualizações regulares
- Revisar CVEs críticas antes de merge
- Evitar pacotes abandonados sem mantenedor ativo

## Princípio do menor privilégio

- Service account com escopo mínimo
- Tokens com permissões restritas e expiração curta
- Ambientes segregados por namespace/projeto

## Supply chain

- Revisão de dependências em PR
- Verificação de código estático e análise de segredos
- Releases com provenance e trilha de auditoria

## Logging seguro

- Redigir PII e credenciais
- Não logar tokens/cookies/senhas

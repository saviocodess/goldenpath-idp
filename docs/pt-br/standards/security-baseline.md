**Português (Brasil)** | [English](../../en/standards/security-baseline.md)

# Standard: Security Baseline

## Objetivo

Definir controles mínimos de segurança para serviços, pipelines e operação do repositório.

## Segredos

- Nunca commitar segredos
- Usar gestão de segredos em runtime
- Rotacionar credenciais periodicamente

## Dependências

- Habilitar atualizações via Dependabot
- Revisar CVEs críticas antes de merge
- Evitar pacotes sem manutenção ativa

## Princípio do Menor Privilégio

- Restringir service accounts ao escopo mínimo
- Usar tokens curtos e com escopo restrito
- Isolar ambientes por namespace/projeto

## Controles de Supply Chain

- Revisão de dependências em pull requests
- Checks estáticos e secret scanning
- Releases rastreáveis e trilha de auditoria

## Logging Seguro

- Redigir PII e credenciais
- Nunca logar tokens, cookies ou senhas

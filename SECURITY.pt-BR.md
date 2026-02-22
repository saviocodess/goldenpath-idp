**Português (Brasil)** | [English](SECURITY.md)

# Política de Segurança

## Reportar Vulnerabilidade

Reporte vulnerabilidades de forma privada pelo GitHub Security Advisory.

Inclua:

- vetor de ataque
- impacto esperado
- repositórios/paths afetados
- evidências mínimas reproduzíveis

## SLA de Resposta

- Triagem inicial: até 2 dias úteis
- Plano de mitigação: até 5 dias úteis
- Correção/divulgação coordenada: conforme severidade

## Baseline de Segurança

- Nunca publique exploit funcional em issue pública.
- Nunca exponha credenciais, tokens ou dados sensíveis em logs/PRs.
- Siga `docs/pt-br/standards/security-baseline.md`.
- Use `docs/pt-br/threat-model.md` como referência de ameaças e controles.

## Recursos de Segurança do GitHub (Configuração do Repositório)

- Habilite o Dependency Graph do GitHub nas configurações do repositório para que Dependabot e dependency review avaliem mudanças.
- Este repositório condiciona o job `dependency-review` à variável de repositório `ENABLE_DEPENDENCY_REVIEW=true`
  para evitar falsos erros enquanto o dependency graph ainda não estiver habilitado.
- Mantenha `.github/dependabot.yml` ativo e revise PRs de atualização com o mesmo padrão (risco, rollback, impacto em docs).

## Versões Suportadas

Atualmente este repositório suporta correções de segurança na branch `main` mais recente.

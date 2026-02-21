**Português (Brasil)** | [English](CONTRIBUTING.md)

# Contribuindo

Obrigado por contribuir com o `goldenpath-idp`.

## Fluxo de Contribuição

1. Abra uma issue com contexto, impacto e abordagem proposta.
2. Crie uma branch no formato `tipo/escopo-descricao` (exemplo: `feat/templates-worker-dlq`).
3. Faça commits pequenos no padrão Conventional Commits.
4. Atualize documentação afetada (`docs/en`, `docs/pt-br`, runbooks, standards, ADRs).
5. Abra pull request usando o template e inclua risco, rollback e plano de validação.

## Requisitos mínimos para Pull Request

- Mudança alinhada ao contrato dos Golden Paths.
- Validação leve executada com `make check`.
- Sem credenciais, segredos ou tokens privados no código/histórico.
- Referências de ownership atualizadas quando necessário (`catalog-info.yaml`, `CODEOWNERS`).
- Paridade de documentação entre EN e PT-BR preservada.

## Política de Revisão

- PRs de templates exigem revisão de plataforma.
- PRs com impacto de segurança exigem revisão de ao menos um owner técnico.
- Mudanças arquiteturais exigem atualização de ADR.

## Convenção de Commit

Use Conventional Commits:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `ci: ...`
- `chore: ...`

## Código de Colaboração

- Seja preciso e factual nas discussões técnicas.
- Prefira trade-offs explícitos a suposições implícitas.
- Preserve segurança operacional e compatibilidade retroativa quando possível.

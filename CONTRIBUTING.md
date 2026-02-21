# Contribuindo

## Fluxo recomendado

1. Abra uma Issue descrevendo problema, impacto e proposta.
2. Crie branch seguindo `tipo/escopo-descricao` (ex.: `feat/templates-worker-dlq`).
3. Faça commits pequenos no padrão Conventional Commits.
4. Atualize documentação afetada (`docs/`, runbooks, padrões, ADRs).
5. Abra PR usando o template e evidencie riscos, rollback e plano de validação.

## Critérios mínimos para PR

- Mudança alinhada ao contrato de Golden Path.
- Validação local leve com `make check`.
- Sem segredos no código ou histórico.
- Atualização de ownership (`catalog-info.yaml`, `CODEOWNERS`) quando aplicável.

## Revisão

- PRs de templates exigem revisão de plataforma.
- PRs de segurança exigem revisão de pelo menos 1 owner técnico.
- ADR obrigatória para mudanças arquiteturais.

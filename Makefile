SHELL := /usr/bin/env bash

.PHONY: help bootstrap dev validate docs gitops templates check

help:
	@echo "Targets disponíveis:"
	@echo "  make bootstrap  -> imprime passos para bootstrap real (sem executar)"
	@echo "  make dev        -> imprime fluxo local recomendado"
	@echo "  make validate   -> imprime validações recomendadas"
	@echo "  make docs       -> imprime checklist de documentação"
	@echo "  make gitops     -> imprime checklist de GitOps/Argo CD"
	@echo "  make templates  -> imprime checklist dos Golden Paths"
	@echo "  make check      -> executa validações estáticas leves"

bootstrap:
	@echo "Bootstrap real deve ser executado em máquina com espaço e rede adequados."
	@bash scripts/preflight-tools.sh
	@echo "Rode manualmente: corepack enable && yarn install"
	@echo "Depois aplique overlays do Backstage e manifests do Argo CD conforme README."

dev:
	@echo "Fluxo sugerido (manual):"
	@echo "1) yarn install"
	@echo "2) yarn lint && yarn test && yarn build"
	@echo "3) validar templates via Backstage scaffolder"

validate:
	@echo "Validações recomendadas para este repositório:"
	@echo "- checagem de dependências duplicadas"
	@echo "- checagem de tabs/trailing spaces em YAML/Markdown"
	@echo "- checagem de paridade bilíngue EN/PT-BR"
	@echo "- checagem de links Markdown locais"
	@echo "- checagem de sintaxe shell"
	@bash scripts/preflight-tools.sh
	@echo "Use: make check"

docs:
	@echo "Checklist de docs: README, ADRs, standards, runbooks e threat model atualizados."

gitops:
	@echo "Checklist GitOps: revisar Argo CD app-of-apps, projects, repositories e apps de exemplo."

templates:
	@echo "Checklist templates: contrato do Golden Path, CI do skeleton e instruções de observabilidade."

check:
	@echo "Executando scripts leves de verificação..."
	@if ! command -v node >/dev/null 2>&1; then \
		echo "[ERRO] 'node' não encontrado. Rode 'bash scripts/preflight-tools.sh' para validar pré-requisitos."; \
		exit 1; \
	fi
	@node scripts/check-deps-duplicates.mjs
	@bash scripts/check-yaml.sh
	@bash scripts/check-i18n-parity.sh
	@bash scripts/check-shell-syntax.sh
	@bash scripts/check-markdown-links.sh

#!/usr/bin/env bash
set -euo pipefail

if command -v git >/dev/null 2>&1 && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  files=$(git ls-files '*.yml' '*.yaml' '*.md')
else
  files=$(find . -type f \( -name '*.yml' -o -name '*.yaml' -o -name '*.md' \) | sed 's|^\./||')
fi

if [[ -z "${files}" ]]; then
  echo "Nenhum arquivo YAML/Markdown rastreado para validar."
  exit 0
fi

has_error=0

while IFS= read -r file; do
  if grep -n $'\t' "${file}" >/dev/null; then
    echo "[ERRO] Tabs encontrados em ${file}:"
    grep -n $'\t' "${file}"
    has_error=1
  fi

  if grep -nE '[[:blank:]]+$' "${file}" >/dev/null; then
    echo "[ERRO] Trailing spaces encontrados em ${file}:"
    grep -nE '[[:blank:]]+$' "${file}"
    has_error=1
  fi
done <<< "${files}"

if [[ "${has_error}" -ne 0 ]]; then
  echo "Validação de YAML/Markdown falhou."
  exit 1
fi

echo "OK: sem tabs e trailing spaces em YAML/Markdown."

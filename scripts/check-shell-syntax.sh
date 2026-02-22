#!/usr/bin/env bash
set -euo pipefail

if command -v git >/dev/null 2>&1 && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  files=$(git ls-files '*.sh')
else
  files=$(find . -type f -name '*.sh' | sed 's|^\./||')
fi

if [[ -z "${files}" ]]; then
  echo "Nenhum script .sh encontrado para validar."
  exit 0
fi

has_error=0

while IFS= read -r file; do
  if ! bash -n "${file}"; then
    echo "[ERRO] Sintaxe shell inválida em ${file}"
    has_error=1
  fi
done <<< "${files}"

if [[ "${has_error}" -ne 0 ]]; then
  echo "Validação de sintaxe shell falhou."
  exit 1
fi

echo "OK: sintaxe shell válida em scripts .sh."

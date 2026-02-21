#!/usr/bin/env bash
set -euo pipefail

EN_DIR="docs/en"
PT_DIR="docs/pt-br"

if [[ ! -d "$EN_DIR" || ! -d "$PT_DIR" ]]; then
  echo "[ERRO] Diretórios bilíngues obrigatórios não encontrados: $EN_DIR e/ou $PT_DIR"
  exit 1
fi

mapfile -t en_files < <(cd "$EN_DIR" && find . -type f -name '*.md' | sed 's|^\./||' | sort)
mapfile -t pt_files < <(cd "$PT_DIR" && find . -type f -name '*.md' | sed 's|^\./||' | sort)

has_error=0

# parity check: each EN file must exist in PT-BR with same relative path
for rel in "${en_files[@]}"; do
  if [[ ! -f "$PT_DIR/$rel" ]]; then
    echo "[ERRO] Arquivo sem par PT-BR: $EN_DIR/$rel"
    has_error=1
  fi
done

# parity check: each PT-BR file must exist in EN with same relative path
for rel in "${pt_files[@]}"; do
  if [[ ! -f "$EN_DIR/$rel" ]]; then
    echo "[ERRO] Arquivo sem par EN: $PT_DIR/$rel"
    has_error=1
  fi
done

check_language_switch() {
  local file="$1"
  local must_contain="$2"

  if [[ ! -f "$file" ]]; then
    echo "[ERRO] Arquivo não encontrado para language switch: $file"
    has_error=1
    return
  fi

  if ! head -n 5 "$file" | grep -Eiq "$must_contain"; then
    echo "[ERRO] Language switch ausente/inválido no topo: $file"
    has_error=1
  fi
}

# check language switch in docs tree files
for rel in "${en_files[@]}"; do
  check_language_switch "$EN_DIR/$rel" 'portugu[eê]s'
done

for rel in "${pt_files[@]}"; do
  check_language_switch "$PT_DIR/$rel" 'english'
done

# check language switch in top-level bilingual docs
check_language_switch "README.md" 'portugu[eê]s'
check_language_switch "README.pt-BR.md" 'english'
check_language_switch "CONTRIBUTING.md" 'portugu[eê]s'
check_language_switch "CONTRIBUTING.pt-BR.md" 'english'
check_language_switch "SECURITY.md" 'portugu[eê]s'
check_language_switch "SECURITY.pt-BR.md" 'english'

if [[ "$has_error" -ne 0 ]]; then
  echo "Validação de paridade i18n falhou."
  exit 1
fi

echo "OK: paridade i18n e language switch validados."

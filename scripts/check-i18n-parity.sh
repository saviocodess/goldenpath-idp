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

# check language switch and pairing in other high-visibility bilingual docs
check_language_switch "backstage/README.md" 'portugu[eê]s'
check_language_switch "backstage/README.pt-BR.md" 'english'
check_language_switch "templates/microservice-http/skeleton/README.md" 'portugu[eê]s'
check_language_switch "templates/microservice-http/skeleton/README.pt-BR.md" 'english'
check_language_switch "templates/worker-event/skeleton/README.md" 'portugu[eê]s'
check_language_switch "templates/worker-event/skeleton/README.pt-BR.md" 'english'

check_pair() {
  local en_file="$1"
  local pt_file="$2"
  if [[ ! -f "$en_file" || ! -f "$pt_file" ]]; then
    echo "[ERRO] Par bilíngue ausente: $en_file <-> $pt_file"
    has_error=1
  fi
}

check_pair "README.md" "README.pt-BR.md"
check_pair "CONTRIBUTING.md" "CONTRIBUTING.pt-BR.md"
check_pair "SECURITY.md" "SECURITY.pt-BR.md"
check_pair "backstage/README.md" "backstage/README.pt-BR.md"
check_pair "templates/microservice-http/skeleton/README.md" "templates/microservice-http/skeleton/README.pt-BR.md"
check_pair "templates/worker-event/skeleton/README.md" "templates/worker-event/skeleton/README.pt-BR.md"

if [[ "$has_error" -ne 0 ]]; then
  echo "Validação de paridade i18n falhou."
  exit 1
fi

echo "OK: paridade i18n e language switch validados."

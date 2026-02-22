#!/usr/bin/env bash
set -euo pipefail

if command -v git >/dev/null 2>&1 && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  files=$(git ls-files '*.md')
else
  files=$(find . -type f -name '*.md' | sed 's|^\./||')
fi

if [[ -z "${files}" ]]; then
  echo "Nenhum arquivo Markdown encontrado para validar links."
  exit 0
fi

extract_targets() {
  # Extract markdown link/image targets from a single line.
  # Handles common patterns: [text](target) and ![alt](target)
  sed -nE 's/.*!?\[[^][]*\]\(([^)]+)\).*/\1/p'
}

has_error=0

while IFS= read -r file; do
  line_no=0
  while IFS= read -r line; do
    line_no=$((line_no + 1))

    target=$(printf '%s\n' "${line}" | extract_targets || true)
    if [[ -z "${target}" ]]; then
      continue
    fi

    # Support multiple links on the same line by greedily re-processing the line.
    remaining="${line}"
    while :; do
      current=$(printf '%s\n' "${remaining}" | sed -nE 's/.*?!?\[[^][]*\]\(([^)]+)\).*/\1/p')
      if [[ -z "${current}" ]]; then
        break
      fi

      # Trim spaces and optional angle brackets.
      current="${current#<}"
      current="${current%>}"
      current="$(printf '%s' "${current}" | sed 's/[[:space:]]*$//; s/^[[:space:]]*//')"

      # Remove anchor/query suffix for local file checks.
      current_no_query="${current%%\?*}"
      current_path="${current_no_query%%#*}"

      # Ignore external and anchor-only links.
      case "${current_path}" in
        ""|"#"*|"http://"*|"https://"*|"mailto:"*|"tel:"*)
          ;;
        *)
          dir=$(dirname "${file}")
          resolved="${dir}/${current_path}"
          # Normalize simple ./ segments.
          resolved=$(printf '%s' "${resolved}" | sed 's#/\./#/#g')
          if [[ ! -e "${resolved}" ]]; then
            echo "[ERRO] Link local quebrado em ${file}:${line_no} -> ${current}"
            has_error=1
          fi
          ;;
      esac

      # Drop up to the first processed link and continue scanning the rest of the line.
      next_remaining=$(printf '%s\n' "${remaining}" | sed -E 's/^[^[]*!?\[[^][]*\]\([^)]+\)//')
      if [[ "${next_remaining}" == "${remaining}" ]]; then
        break
      fi
      remaining="${next_remaining}"
    done
  done < "${file}"
done <<< "${files}"

if [[ "${has_error}" -ne 0 ]]; then
  echo "Validação de links Markdown falhou."
  exit 1
fi

echo "OK: links locais em Markdown validados."

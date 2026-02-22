#!/usr/bin/env bash
set -euo pipefail

strict=0
if [[ "${1:-}" == "--strict" ]]; then
  strict=1
fi

check_tool() {
  local name="$1"
  local required="$2"
  local version_cmd="$3"

  if command -v "${name}" >/dev/null 2>&1; then
    local version
    version="$(eval "${version_cmd}" 2>/dev/null | head -n 1 || true)"
    if [[ -n "${version}" ]]; then
      printf '[OK] %-10s %s\n' "${name}" "${version}"
    else
      printf '[OK] %-10s found\n' "${name}"
    fi
    return 0
  fi

  if [[ "${required}" == "required" ]]; then
    printf '[MISSING][required] %s\n' "${name}"
    return 1
  fi

  printf '[MISSING][optional] %s\n' "${name}"
  return 0
}

echo "Preflight de ferramentas para uso real do GoldenPath IDP"
echo "--------------------------------------------------------"

required_missing=0

check_tool bash required 'bash --version' || required_missing=1
check_tool git required 'git --version' || required_missing=1
check_tool node optional 'node --version'
check_tool corepack optional 'corepack --version'
check_tool yarn optional 'yarn --version'
check_tool docker optional 'docker --version'
check_tool kubectl optional 'kubectl version --client --short'
check_tool helm optional 'helm version --short'
check_tool kind optional 'kind version'
check_tool gh optional 'gh --version'

echo
echo "Notas:"
echo "- Para checks locais do repo, tenha Node + Corepack/Yarn disponíveis."
echo "- Para publicar/operar GitHub, use gh CLI ou credenciais git."
echo "- Para demo completa GitOps, use Docker/Kind/Kubectl/Helm em máquina com espaço."

if [[ "${strict}" -eq 1 && "${required_missing}" -ne 0 ]]; then
  exit 1
fi

exit 0

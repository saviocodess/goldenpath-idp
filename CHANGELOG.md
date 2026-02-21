# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

- No pending entries.

## [0.2.0] - 2026-02-21

### Added

- Full bilingual documentation architecture with mirrored content:
  - `docs/en/...`
  - `docs/pt-br/...`
- Language-specific indexes:
  - `docs/en/index.md`
  - `docs/pt-br/index.md`
- Portuguese mirror for root documents:
  - `README.pt-BR.md`
  - `CONTRIBUTING.pt-BR.md`
  - `SECURITY.pt-BR.md`
- Bilingual docs for Backstage and Golden Path skeleton READMEs.
- New i18n quality check script:
  - `scripts/check-i18n-parity.sh`

### Changed

- `README.md` became global-first (English) with language switch and professional positioning sections.
- Added professional profile placeholders and explicit seniority evidence narrative.
- `CONTRIBUTING.md` and `SECURITY.md` moved to English-first with PT-BR mirrors.
- `Makefile` now includes i18n parity validation in `make check`.
- CI static checks now validate bilingual parity.

## [0.1.0] - 2026-02-21

### Added

- Base repository scaffold with governance files and GitHub templates.
- Two complete Golden Paths with real skeletons:
  - `microservice-http`
  - `worker-event`
- Backstage overlays for catalog and scaffolder registration.
- GitOps baseline with Argo CD app-of-apps and example apps.
- Prescriptive standards, operational runbooks, ADRs, and threat model.
- CI, security, and release workflows.
- Lightweight static validation scripts (`check-deps-duplicates`, `check-yaml`).

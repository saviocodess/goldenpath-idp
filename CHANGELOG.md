# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

- No pending entries.

## [0.2.2] - 2026-02-22

### Added

- GitHub issue template configuration with security advisory routing and contributor/documentation links.
- Status badges (CI, Security, Release, License) in `README.md` and `README.pt-BR.md`.

### Changed

- Bilingual PR/issue templates now capture risk, rollback, validation, and impact with EN/PT-BR guidance.
- CI, security, and release workflows now use `concurrency` and job timeouts to reduce duplicate runs and improve stability.
- Release workflow docs artifact now packages bilingual root docs plus `CHANGELOG.md` and `LICENSE`.
- `scripts/check-i18n-parity.sh` now validates bilingual pairing/language switch for:
  - `backstage/README*`
  - `templates/*/skeleton/README*`

### Fixed

- `dependency-review` security job is now gated behind repository variable `ENABLE_DEPENDENCY_REVIEW=true`
  to avoid false failures before GitHub Dependency Graph is enabled for the repository.

## [0.2.1] - 2026-02-22

### Fixed

- CI workflow no longer fails when root `yarn.lock` is absent (`actions/setup-node` cache removed at repository level).
- Security secret scan now uses full git history checkout for Gitleaks commit-range scans.
- Release workflow release-notes extraction script fixed (`awk` pattern handling).

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

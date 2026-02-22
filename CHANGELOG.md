# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

- No pending entries.

## [0.2.4] - 2026-02-22

### Added

- Real-use onboarding guide in both languages:
  - `docs/en/getting-started.md`
  - `docs/pt-br/getting-started.md`
- Lightweight repository automation scripts:
  - `scripts/preflight-tools.sh`
  - `scripts/check-shell-syntax.sh`
  - `scripts/check-markdown-links.sh`
- Template usability assets for generated services:
  - `.env.example`
  - `.dockerignore`

### Changed

- Root `README.md` and `README.pt-BR.md` now include quick-start after clone and onboarding links.
- Docs indexes (`docs/en/index.md`, `docs/pt-br/index.md`) now expose a clear “start here” path.
- Root `Makefile` validation flow now documents and invokes preflight guidance, and `make check` validates shell syntax + local markdown links.
- Root CI static checks now include shell syntax and markdown link validation.
- CI install steps (root + template workflows) now support both Yarn classic (`--frozen-lockfile`) and Yarn modern (`--immutable`) when `yarn.lock` exists.
- Template Dockerfiles hardened for real usage:
  - multi-stage build/runtime layout
  - non-root runtime user
  - `worker-event` runtime command fixed to `dist/worker.js`
  - `microservice-http` container healthcheck added

## [0.2.3] - 2026-02-22

### Changed

- Refactored `microservice-http` skeleton into a more maintainable runtime structure:
  - `src/app.ts` (Express app composition)
  - `src/config.ts` (validated runtime config parsing)
  - improved JSON errors, request correlation, and graceful shutdown flow
- Refactored `worker-event` skeleton for better testability and operations:
  - `src/config.ts` (validated worker config parsing)
  - deterministic/testable retry behavior and richer DLQ metadata
  - signal-aware consume loop and metrics server lifecycle cleanup
- Both skeletons now use `tsconfig.build.json` for production builds (excluding tests from `dist`).
- Skeleton `package.json` scripts now include `verify` (lint + typecheck + tests) and `test:ci`.
- Skeleton CI workflows hardened with `workflow_dispatch`, `concurrency`, `timeout-minutes`, and no lockfile-dependent `setup-node` cache.

### Added

- New template tests for configuration parsing (`tests/config.test.ts` in both skeletons).
- Worker metrics improvements:
  - `worker_attempt_total`
  - Prometheus `HELP`/`TYPE` headers
  - `GET /health` on the metrics server

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

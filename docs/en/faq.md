[Português (Brasil)](../pt-br/faq.md) | **English**

# FAQ (EN)

## Is this a full product or a production-ready reference baseline?

It is a production-oriented reference baseline. The repository includes real templates, GitOps manifests, and standards,
but each company should customize ownership, repository URLs, environments, and security controls before rollout.

## Can I use the templates without Backstage?

Yes. The templates are designed for Backstage Scaffolder, but the skeletons under `templates/*/skeleton` can also be
used directly as manual starters.

## Can I use the GitOps manifests without Argo CD app-of-apps?

Yes. The examples are structured for Argo CD app-of-apps, but the manifests can be adapted to direct `kubectl apply`,
Kustomize pipelines, or another GitOps controller.

## Why are lockfiles not committed at the repository root?

This repository is intentionally designed to remain lightweight and bootstrap-friendly in constrained environments.
Install instructions are documented, and lockfiles can be generated in real development machines.

## Why is `dependency-review` skipped in some workflow runs?

The job is gated behind the repository variable `ENABLE_DEPENDENCY_REVIEW=true` and depends on GitHub Dependency Graph.
This avoids false failures before repository security settings are fully enabled.

## What should I customize first after forking?

- GitHub org/repo URLs in Backstage locations and Argo CD app manifests
- ownership entities (`group:default/...`) and `catalog-info.yaml`
- environment-specific namespaces/projects/repositories in Argo CD manifests
- security baselines and CI gates aligned with your organization

## What is the minimum path to demonstrate value quickly?

1. Run `make check`
2. Register Backstage templates
3. Generate one service using `microservice-http`
4. Apply Argo CD root app and sync example apps
5. Walk through one runbook and one ADR with your team

## How do I add a new Golden Path?

Follow the design and governance references:

- `docs/en/standards/golden-path-contracts.md`
- `docs/en/adr/0004-templates-design-contract.md`

Then add:

- template skeleton under `templates/<new-path>/skeleton`
- Backstage scaffolder template under `backstage/overlays/scaffolder/templates/`
- optional GitOps example manifests under `gitops/argocd/manifests/examples/`
- documentation updates in both EN/PT-BR

## Is this repository useful for interviews and technical assessments?

Yes. It intentionally exposes architecture decisions, standards, operational runbooks, GitOps design, and CI/security
workflows so reviewers can evaluate technical reasoning beyond code snippets.

[Português (Brasil)](../pt-br/demo-script.md) | **English**

# Demo Script - GoldenPath IDP

## Demo Goal

Show how the platform reduces bootstrap time, increases engineering consistency, and enables auditable operations through GitOps.

## Suggested Duration

20 to 30 minutes.

## Prerequisites (real machine)

- Running Backstage instance
- GitHub access to create repositories
- Argo CD installed in a demo cluster

## Script

1. Business context (3 min)
- Problem: repetitive setup and inconsistent engineering baseline.
- Proposal: Golden Paths + standards + GitOps.

2. Backstage Scaffolder (5 min)
- Show `microservice-http` and `worker-event` templates.
- Generate one HTTP service and highlight owner/repository parameters.

3. Generated service contracts (5 min)
- Open `catalog-info.yaml`, `README`, and `src/server.ts`.
- Highlight `/health`, `/ready`, JSON logs, and `request_id`.

4. Async worker flow (4 min)
- Show retry/backoff, metrics, and DLQ stub.

5. CI/CD and security (4 min)
- Show single install strategy in CI.
- Show security workflow (CodeQL, dependency review, secret scan).

6. Argo CD GitOps (5 min)
- Show `root-app.yaml` and child applications.
- Explain adding a new app through PR.

## Closing

- Reinforce outcomes: consistency, speed, auditability.
- Next step: onboard pilot squads.

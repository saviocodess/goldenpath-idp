[Português (Brasil)](../pt-br/glossary.md) | **English**

# Glossary (EN)

## ADR (Architecture Decision Record)

Short document that captures a technical decision, context, alternatives, and consequences.

## Argo CD Project

A logical policy boundary in Argo CD used to constrain destinations, repositories, and resource permissions for apps.

## App-of-Apps

Argo CD pattern where a root application manages child application definitions declaratively.

## Backstage Catalog Entity

A typed entity (for example `Component`, `System`, `Group`) registered in the Backstage catalog.

## Backstage Scaffolder

Backstage plugin used to generate repositories/services from templates and parameter forms.

## Correlation ID / Request ID

Identifier propagated across logs and requests to correlate events in distributed systems.

## Developer Experience (DevEx)

The quality of tooling, workflows, standards, and feedback loops experienced by engineers.

## DLQ (Dead-Letter Queue)

Destination for messages that failed processing after retries and require later inspection or reprocessing.

## GitOps

Operational model where desired system state is stored in Git and reconciled by automation/controllers.

## Golden Path

A recommended, supported implementation path that balances speed, safety, and consistency for common use cases.

## Health Check

Endpoint or probe used to signal process liveness/readiness to operators and orchestration systems.

## IDP (Internal Developer Platform)

Platform capabilities, tools, and workflows provided internally to improve developer self-service and governance.

## MTTR (Mean Time To Recovery/Restore)

Average time needed to restore service after an incident or failure.

## Observability

Ability to understand system behavior through telemetry such as logs, metrics, and traces.

## OTel / OpenTelemetry

Open standard and tooling ecosystem for generating and exporting telemetry data (traces, metrics, logs).

## Ownership

Explicit assignment of responsibility for a service, component, or platform capability (team/person/on-call rotation).

## Runbook

Operational procedure for responding to recurring incidents, failures, or maintenance activities.

## SLI / SLO

- SLI (Service Level Indicator): measurable signal (latency, availability, error rate)
- SLO (Service Level Objective): target threshold for one or more SLIs

## Template Contract

The mandatory behavior, files, and standards a generated service must implement to be considered compliant.

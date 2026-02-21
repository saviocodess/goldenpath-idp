[Português (Brasil)](../../pt-br/runbooks/backstage-catalog-troubleshooting.md) | **English**

# Runbook: Backstage Catalog Troubleshooting

## Scenario

Templates or entities do not appear in Backstage catalog/Scaffolder.

## Quick Checklist

1. Validate `catalog.locations` in Backstage config.
2. Validate HTTP accessibility for `raw.githubusercontent.com` assets.
3. Validate YAML syntax for entities.
4. Validate GitHub integration permissions/tokens.

## Detailed Diagnosis

1. Inspect Backstage backend logs for ingestion errors.
2. Re-process the catalog location.
3. Validate `apiVersion`, `kind`, and `metadata.name`.
4. Confirm template API version (`scaffolder.backstage.io/v1beta3`).

## Common Errors

- URL pointing to `blob` instead of `raw`
- invalid entity schema/required fields
- expired integration token

## Mitigation

- Correct location URLs/paths
- Open PR with entity/template fix
- Reload catalog and revalidate

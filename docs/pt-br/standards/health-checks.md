**Português (Brasil)** | [English](../../en/standards/health-checks.md)

# Standard: Health Checks

## Objetivo

Definir contrato consistente de health e readiness para serviços gerados.

## Endpoints Obrigatórios

- `GET /health`: saúde do processo
- `GET /ready`: prontidão para tráfego/processamento

## Contrato Mínimo de Resposta

`/health`:

- `status: ok`
- `uptime_seconds`
- `timestamp`

`/ready`:

- `status: ready | not_ready`
- `checks` com validações internas de prontidão

## Códigos HTTP

- `200` para saudável/pronto
- `503` para não pronto

## Regras

- Sem checagens destrutivas
- Sem dados sensíveis no payload
- Alvo de latência típico: abaixo de 100ms

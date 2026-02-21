# Standard: Health Checks

## Objetivo

Definir contrato uniforme de saúde e prontidão para serviços gerados.

## Endpoints obrigatórios

- `GET /health`: status do processo
- `GET /ready`: prontidão para tráfego/processamento

## Contrato mínimo de resposta

`/health`:

- `status: ok`
- `uptime_seconds`
- `timestamp`

`/ready`:

- `status: ready | not_ready`
- `checks` com verificações internas

## Códigos HTTP

- `200` quando saudável/pronto
- `503` quando não pronto

## Regras

- Não executar checagens destrutivas
- Não incluir dados sensíveis no payload
- SLA de resposta do endpoint de health < 100ms em condições normais

**Português (Brasil)** | [English](../en/demo-script.md)

# Roteiro de Demo - GoldenPath IDP

## Objetivo da Demo

Demonstrar como a plataforma reduz tempo de bootstrap, aumenta consistência de engenharia e habilita operação auditável com GitOps.

## Duração Sugerida

20 a 30 minutos.

## Pré-requisitos (máquina real)

- Backstage em execução
- Acesso ao GitHub para criar repositórios
- Argo CD instalado em cluster de demo

## Roteiro

1. Contexto de negócio (3 min)
- Problema: setup repetitivo e baseline inconsistente.
- Proposta: Golden Paths + padrões + GitOps.

2. Backstage Scaffolder (5 min)
- Mostrar templates `microservice-http` e `worker-event`.
- Gerar um serviço HTTP e destacar parâmetros de owner/repositório.

3. Contratos do serviço gerado (5 min)
- Abrir `catalog-info.yaml`, `README` e `src/server.ts`.
- Destacar `/health`, `/ready`, logs JSON e `request_id`.

4. Fluxo de worker assíncrono (4 min)
- Mostrar retry/backoff, métricas e stub de DLQ.

5. CI/CD e segurança (4 min)
- Mostrar estratégia de instalação única no CI.
- Mostrar workflow de segurança (CodeQL, dependency review, secret scan).

6. GitOps com Argo CD (5 min)
- Mostrar `root-app.yaml` e aplicações filhas.
- Explicar adição de novo app via PR.

## Fechamento

- Reforçar resultados: consistência, velocidade e auditabilidade.
- Próximo passo: onboarding de squads piloto.

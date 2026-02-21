# Demo Script - GoldenPath IDP

## Objetivo da demo

Mostrar que a plataforma reduz tempo de criação de serviço, mantém qualidade mínima e habilita operação com GitOps.

## Duração sugerida

20 a 30 minutos.

## Pré-requisitos (em máquina real)

- Backstage em execução
- Acesso a GitHub com permissão de criação de repositórios
- Argo CD instalado em cluster de demonstração

## Roteiro

1. Contexto de negócio (3 min)
- Problema atual: setup repetitivo e inconsistência entre times.
- Proposta: Golden Paths + padrões + GitOps.

2. Backstage Scaffolder (5 min)
- Mostrar templates `microservice-http` e `worker-event`.
- Gerar um serviço HTTP e destacar parâmetros de owner/repo.

3. Contratos do serviço gerado (5 min)
- Abrir `catalog-info.yaml`, `README`, `src/server.ts`.
- Destacar `/health`, `/ready`, logs JSON e `request_id`.

4. Worker assíncrono (4 min)
- Mostrar retry/backoff, métricas e stub de DLQ.

5. CI/CD e segurança (4 min)
- Exibir workflow de CI único install.
- Exibir workflow de security (CodeQL, dependency review, secret scan).

6. GitOps com Argo CD (5 min)
- Mostrar `root-app.yaml` e apps de exemplo.
- Explicar fluxo de adicionar app novo via PR.

## Fechamento

- Reforçar ganhos: consistência, velocidade, auditabilidade.
- Próximos passos: adoção por squads piloto.

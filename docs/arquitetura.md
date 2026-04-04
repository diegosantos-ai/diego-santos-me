# ARQUITETURA: Portfólio Profissional — Diego Santos

## 1. Stack Tecnológica
- Backend:
  - Next.js (App Router) para renderização da aplicação web
  - TypeScript para tipagem e manutenção
  - Camada server-side para leitura e transformação dos dados exibidos no site
  - Endpoint interno ou jobs de sincronização para abastecer a seção Learning in Public
  - Integração com GitHub API para leitura de pull requests, commits e links de repositório
  - LLM aplicada apenas como componente de enriquecimento editorial dos eventos técnicos do Learning in Public

- Frontend:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Componentização orientada a seções editoriais
  - Animações leves e controladas apenas onde houver ganho de leitura, especialmente nos flash cards do Learning in Public

- Banco de Dados:
  - PostgreSQL
  - Tabelas voltadas a conteúdo estruturado do portfólio, projetos em destaque, metadados de conteúdos e cache de eventos processados do Learning in Public

- Infraestrutura:
  - Docker para empacotamento
  - Docker Compose para ambiente local
  - GitHub Actions para CI/CD
  - Terraform para provisionamento de infraestrutura
  - Hospedagem web em ambiente cloud compatível com aplicação Next.js e workloads auxiliares
  - Armazenamento seguro de segredos por variáveis de ambiente e secrets do pipeline
  - Possível worker agendado para ingestão e processamento contínuo do Learning in Public

## 2. Topologia de Infraestrutura (IaC)
A infraestrutura deve ser descrita e provisionada de forma modular, priorizando simplicidade operacional, automação e evolução incremental.

### Módulos Terraform sugeridos
- **network**
  - recursos de rede necessários para a aplicação e serviços auxiliares
  - definição de sub-redes, regras mínimas de segurança e isolamento básico entre serviços, quando aplicável

- **compute-web**
  - camada responsável pela aplicação principal do portfólio
  - pode representar serviço gerenciado, container app ou instância compatível com execução do frontend/backend web

- **compute-worker**
  - execução do job responsável por consultar eventos do GitHub, processar pull requests e atualizar o bloco Learning in Public
  - separado da aplicação principal para reduzir acoplamento operacional

- **database**
  - provisionamento do PostgreSQL ou serviço gerenciado equivalente
  - parâmetros mínimos de backup, disponibilidade compatível com o escopo e configuração de acesso restrito

- **secrets**
  - integração com mecanismo de secrets da cloud ou parametrização segura para tokens, chaves e credenciais
  - nunca hardcode de segredo em código ou Terraform state exposto

- **observability**
  - recursos associados a coleta de logs, métricas e dashboards
  - preparação de endpoints, labels e integrações necessárias para Promtail, Loki, Prometheus e Grafana

- **dns_tls**
  - gerenciamento de domínio, registros DNS e certificados TLS
  - garantir acesso seguro ao portfólio público

### Diretriz arquitetural
A topologia deve separar claramente:
1. aplicação web pública;
2. processamento assíncrono do Learning in Public;
3. persistência;
4. observabilidade;
5. segredos e configuração.

Essa separação facilita:
- manutenção;
- troubleshooting;
- evolução incremental;
- troca futura de componentes sem reescrita total.

## 3. Estratégia de Observabilidade
- Logs:
  - JSON estruturado via Promtail/Loki
  - correlação por request_id, event_id e source
  - logs separados por contexto: aplicação web, sincronização GitHub, processamento LLM e persistência
  - evitar logs verbosos sem valor operacional

- Métricas:
  - Prometheus/Grafana
  - métricas mínimas da aplicação:
    - latência por rota
    - taxa de erro
    - disponibilidade
    - tempo de resposta do bloco Learning in Public
    - volume de eventos processados
    - falhas de ingestão
    - falhas de enriquecimento
  - dashboards focados em operação, não em vaidade

- Tracing:
  - tracing distribuído é opcional na fase inicial
  - pode ser introduzido depois para rastrear fluxo entre leitura do GitHub, processamento e renderização do conteúdo

- Alertas:
  - alertas mínimos para indisponibilidade da aplicação
  - falha recorrente no job de sincronização
  - crescimento anormal de erro 5xx
  - falha de conexão com banco
  - falha de autenticação em integrações externas

### Sinais de sucesso operacional
- aplicação disponível com baixa taxa de erro;
- sincronização periódica do Learning in Public funcionando sem intervenção manual;
- logs suficientes para explicar falhas sem depender de tentativa e erro;
- métricas suficientes para identificar gargalos, regressões e indisponibilidade.

-- ==============================================================================
-- SEED INICIAL DE PROJECTS A PARTIR DOS MARKDOWN VERSIONADOS
-- ==============================================================================
--
-- Observacao:
-- O banco local configurado em application.properties esta vazio para:
--   * projects
--   * contents
--   * learning_events
--
-- Como ainda nao existe um sync editorial implementado no backend Java para
-- popular projects/contents, esta migration garante pelo menos a carga inicial
-- dos projetos publicos do portfolio a partir da fonte oficial versionada em Git.
--
-- Fonte:
--   content/projetos/*.md
--
-- Escopo:
--   * seeds apenas para projects
--   * sem seeds para content_links/project_links, pois nao ha links estruturados
--   * sem seeds para learning_events, pois a tabela esta vazia e depende do worker

INSERT INTO projects (
    slug,
    name,
    short_description,
    problem,
    solution,
    technical_highlights,
    architecture_summary,
    stack_summary,
    is_anchor,
    is_featured,
    display_order,
    status,
    source_path,
    published_at
) VALUES (
    'nexo360',
    'Nexo 360',
    'Plataforma multi-agente desenhada para resolver demandas reais de PMEs, com arquitetura modular, multi-tenant e foco em evolucao segura.',
    'PMEs precisam transformar dados e contexto operacional em orientacao pratica para decisao, mas normalmente operam com pouco tempo de analise, baixa integracao entre areas e baixa acessibilidade a inteligencia de negocio.',
    'O projeto organiza cinco agentes especializados e um orquestrador central para entregar analise, recomendacao e interacao contextual via WhatsApp e web, com memoria persistente, onboarding orientado ao negocio e isolamento total por tenant.',
    'Python, FastAPI, arquitetura hexagonal, RAG, LLMs, memoria persistente, multi-tenancy, observabilidade.',
    'Arquitetura hexagonal com separacao entre dominio, portas e adaptadores, canais diferentes sobre o mesmo pipeline de IA, autenticacao por tenant e isolamento completo de contexto entre clientes.',
    'Python, FastAPI, Hexagonal, IA, Grafana, RAG, LLM.',
    TRUE,
    TRUE,
    1,
    'published',
    'content/projetos/nexo360.md',
    CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    problem = EXCLUDED.problem,
    solution = EXCLUDED.solution,
    technical_highlights = EXCLUDED.technical_highlights,
    architecture_summary = EXCLUDED.architecture_summary,
    stack_summary = EXCLUDED.stack_summary,
    is_anchor = EXCLUDED.is_anchor,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order,
    status = EXCLUDED.status,
    source_path = EXCLUDED.source_path,
    published_at = EXCLUDED.published_at,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO projects (
    slug,
    name,
    short_description,
    problem,
    solution,
    technical_highlights,
    architecture_summary,
    stack_summary,
    is_anchor,
    is_featured,
    display_order,
    status,
    source_path,
    published_at
) VALUES (
    'mini-erp',
    'Mini ERP de Compras',
    'Mini ERP em Java/Spring Boot para compras, recebimento e estoque, com monolito modular, autenticacao JWT e base DevOps-first.',
    'Processos de compras, recebimento e estoque executados com controles fragmentados geram erro manual, baixa rastreabilidade, dificuldade para auditar aprovacoes e incerteza sobre o saldo real da operacao.',
    'A solucao desenha um Mini ERP web com fluxo-alvo de requisicao, aprovacao, pedido, recebimento e estoque; nesta fase, consolida a fundacao com identidade e acesso, JWT, Flyway, health check, testes de integracao, automacao local, validacoes antecipadas e governanca rastreavel do fluxo de entrega.',
    'Java 17, Spring Boot 3.3, Spring Security, JWT, Flyway, JPA, H2, Actuator, testes de integracao, Makefile, pre-commit, pre-push, secret scan, configuracao por variaveis de ambiente, GitHub Projects, ADRs.',
    'O backend segue um monolito modular DevOps-first, separando api, application, domain e infrastructure, com autenticacao stateless, banco versionado, disciplina de processo documentada e base preparada para evolucao incremental de modulos transacionais e operacao em nuvem.',
    'Java, Spring Boot, Spring Security, Flyway, JWT.',
    FALSE,
    TRUE,
    7,
    'published',
    'content/projetos/mini-erp.md',
    CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    problem = EXCLUDED.problem,
    solution = EXCLUDED.solution,
    technical_highlights = EXCLUDED.technical_highlights,
    architecture_summary = EXCLUDED.architecture_summary,
    stack_summary = EXCLUDED.stack_summary,
    is_anchor = EXCLUDED.is_anchor,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order,
    status = EXCLUDED.status,
    source_path = EXCLUDED.source_path,
    published_at = EXCLUDED.published_at,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO projects (
    slug,
    name,
    short_description,
    problem,
    solution,
    technical_highlights,
    architecture_summary,
    stack_summary,
    is_anchor,
    is_featured,
    display_order,
    status,
    source_path,
    published_at
) VALUES (
    'dev-workspace',
    'DevOps Workspace',
    'Workspace declarativo para padronizar ambientes de desenvolvimento com mais previsibilidade, automacao e menos friccao operacional.',
    'Ambientes de desenvolvimento inconsistentes criam drift, retrabalho, dependencia de memoria operacional e baixa confiabilidade para subir projetos, validar dependencias e retomar contexto.',
    'A solucao trata a workstation como infraestrutura gerenciada, com bootstrap, setup, pos-setup e validacao, reunindo provisionamento idempotente, dotfiles versionados, servicos core locais e rotinas operacionais via make.',
    'Ansible, Terraform, Docker, Make, dotfiles versionados, validacoes de sanidade, infraestrutura local, shift-left de qualidade.',
    'O projeto usa make como interface unica, separa bootstrap, provisionamento declarativo e validacao operacional, e organiza o repositorio em camadas reaproveitaveis para escalar governanca tecnica.',
    'Ansible, Terraform, Docker, Make.',
    FALSE,
    TRUE,
    2,
    'published',
    'content/projetos/dev-workspace.md',
    CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    problem = EXCLUDED.problem,
    solution = EXCLUDED.solution,
    technical_highlights = EXCLUDED.technical_highlights,
    architecture_summary = EXCLUDED.architecture_summary,
    stack_summary = EXCLUDED.stack_summary,
    is_anchor = EXCLUDED.is_anchor,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order,
    status = EXCLUDED.status,
    source_path = EXCLUDED.source_path,
    published_at = EXCLUDED.published_at,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO projects (
    slug,
    name,
    short_description,
    problem,
    solution,
    technical_highlights,
    architecture_summary,
    stack_summary,
    is_anchor,
    is_featured,
    display_order,
    status,
    source_path,
    published_at
) VALUES (
    'iac',
    'AWS Infrastructure (IaC)',
    'Infraestrutura web em AWS provisionada com Terraform, com foco em modularidade, repetibilidade e controle operacional.',
    'Publicar um servico rapidamente pela console da cloud resolve o curto prazo, mas gera baixa rastreabilidade, dependencia de memoria operacional e dificuldade para revisar, reaplicar e governar o ambiente.',
    'A solucao modela rede, seguranca, computacao, backend remoto de state e pipeline de validacao em Terraform, permitindo revisar mudancas com plan e executar apply de forma controlada.',
    'Terraform, AWS, modularizacao por dominio, backend remoto em S3, CI/CD controlado, state versionado, blocos moved.',
    'A arquitetura evoluiu de estrutura flat para modulos de rede, seguranca e computacao, com state remoto em S3 e separacao clara entre CI automatico e CD manual na branch principal.',
    'Terraform, AWS, IaC, GitHub Actions.',
    FALSE,
    TRUE,
    3,
    'published',
    'content/projetos/iac.md',
    CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    problem = EXCLUDED.problem,
    solution = EXCLUDED.solution,
    technical_highlights = EXCLUDED.technical_highlights,
    architecture_summary = EXCLUDED.architecture_summary,
    stack_summary = EXCLUDED.stack_summary,
    is_anchor = EXCLUDED.is_anchor,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order,
    status = EXCLUDED.status,
    source_path = EXCLUDED.source_path,
    published_at = EXCLUDED.published_at,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO projects (
    slug,
    name,
    short_description,
    problem,
    solution,
    technical_highlights,
    architecture_summary,
    stack_summary,
    is_anchor,
    is_featured,
    display_order,
    status,
    source_path,
    published_at
) VALUES (
    'chat',
    'Munio - IA Institucional para Atendimento Publico',
    'Plataforma de atendimento com IA, RAG e auditoria para orgaos publicos que precisam responder com contexto, rastreabilidade e governanca.',
    'Levar IA para atendimento institucional sem abrir mao de governanca exige evitar mistura de contexto, reduzir respostas sem base documental e manter trilha de auditoria para operacoes sensiveis.',
    'A solucao estrutura atendimento institucional com contexto explicito por tenant, recuperacao via RAG, validacoes antes e depois da geracao e observabilidade para diagnostico e evolucao segura.',
    'Python, FastAPI, RAG, LLM, isolamento por tenant, politicas de validacao, auditoria, observabilidade.',
    'A arquitetura separa runtime transacional de avaliacao offline, prioriza resposta com controle e observabilidade no fluxo principal e reduz risco ao nao depender apenas do modelo sem base documental.',
    'Python, FastAPI, RAG, LLM.',
    FALSE,
    TRUE,
    4,
    'published',
    'content/projetos/chat.md',
    CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    problem = EXCLUDED.problem,
    solution = EXCLUDED.solution,
    technical_highlights = EXCLUDED.technical_highlights,
    architecture_summary = EXCLUDED.architecture_summary,
    stack_summary = EXCLUDED.stack_summary,
    is_anchor = EXCLUDED.is_anchor,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order,
    status = EXCLUDED.status,
    source_path = EXCLUDED.source_path,
    published_at = EXCLUDED.published_at,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO projects (
    slug,
    name,
    short_description,
    problem,
    solution,
    technical_highlights,
    architecture_summary,
    stack_summary,
    is_anchor,
    is_featured,
    display_order,
    status,
    source_path,
    published_at
) VALUES (
    'observabilidade',
    'Stack de Observabilidade',
    'Stack de observabilidade para monitorar aplicacoes com metricas, dashboards e logs estruturados, facilitando diagnostico e operacao.',
    'Sem observabilidade estruturada, a equipe detecta falhas tarde, investiga no escuro e aumenta o MTTR por depender de verificacoes manuais e evidencias dispersas.',
    'A solucao combina Prometheus, Grafana, Loki, Promtail, Node Exporter e Slack para coletar metricas, centralizar logs estruturados, exibir dashboards e disparar alertas operacionais.',
    'Grafana, Prometheus, Loki, Promtail, Node Exporter, Slack, logs estruturados, alertas, dashboards.',
    'A arquitetura centraliza a leitura no Grafana, adota logs JSON como base principal de observabilidade e usa Docker Compose para uma execucao reproduzivel com escopo tecnico controlado.',
    'Grafana, Prometheus, Loki, Docker, Terraform.',
    FALSE,
    TRUE,
    5,
    'published',
    'content/projetos/observabilidade.md',
    CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    problem = EXCLUDED.problem,
    solution = EXCLUDED.solution,
    technical_highlights = EXCLUDED.technical_highlights,
    architecture_summary = EXCLUDED.architecture_summary,
    stack_summary = EXCLUDED.stack_summary,
    is_anchor = EXCLUDED.is_anchor,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order,
    status = EXCLUDED.status,
    source_path = EXCLUDED.source_path,
    published_at = EXCLUDED.published_at,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO projects (
    slug,
    name,
    short_description,
    problem,
    solution,
    technical_highlights,
    architecture_summary,
    stack_summary,
    is_anchor,
    is_featured,
    display_order,
    status,
    source_path,
    published_at
) VALUES (
    'portifolio',
    'Portfólio Profissional',
    'Portfólio construído como produto real, com CI/CD, observabilidade e backend Java para reforçar engenharia, nao so apresentacao.',
    'A versao anterior do portfolio nao comunicava bem a evolucao profissional, enfraquecia o posicionamento tecnico e nao funcionava como prova concreta de maturidade em engenharia.',
    'A solucao reconstruiu o portfolio como sistema real, com frontend em Next.js, backend Java, PostgreSQL, Learning in Public, observabilidade, deploy automatizado e operacao documentada.',
    'Next.js, Java, Spring Boot, PostgreSQL, CI/CD, observabilidade, Nginx, Docker Compose, Learning in Public.',
    'A arquitetura separa web-app, portfolio-api-java, PostgreSQL, proxy e observabilidade, preservando baixo acoplamento, troubleshooting mais simples e espaco para evolucao incremental do produto.',
    'Next.js, Java, Spring Boot, Docker.',
    FALSE,
    TRUE,
    6,
    'published',
    'content/projetos/portifolio.md',
    CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    problem = EXCLUDED.problem,
    solution = EXCLUDED.solution,
    technical_highlights = EXCLUDED.technical_highlights,
    architecture_summary = EXCLUDED.architecture_summary,
    stack_summary = EXCLUDED.stack_summary,
    is_anchor = EXCLUDED.is_anchor,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order,
    status = EXCLUDED.status,
    source_path = EXCLUDED.source_path,
    published_at = EXCLUDED.published_at,
    updated_at = CURRENT_TIMESTAMP;

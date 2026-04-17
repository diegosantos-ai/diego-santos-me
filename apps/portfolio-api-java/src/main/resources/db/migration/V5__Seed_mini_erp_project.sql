-- ==============================================================================
-- ADD MINI ERP PROJECT TO EDITORIAL PROJECT SEEDS
-- ==============================================================================
--
-- Importante:
-- O projeto mini-erp foi adicionado depois que a V2 ja havia sido aplicada em
-- ambientes remotos. Por isso, o seed fica em uma nova migration dedicada,
-- preservando o checksum historico da V2 no Flyway.

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

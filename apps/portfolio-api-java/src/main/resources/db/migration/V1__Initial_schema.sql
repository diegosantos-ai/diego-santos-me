-- ==============================================================================
-- SCHEMA INICIAL - PORTFÓLIO V1
-- ==============================================================================

-- 1. Criação de Projects
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    short_description TEXT,
    problem TEXT,
    solution TEXT,
    technical_highlights TEXT,
    architecture_summary TEXT,
    stack_summary TEXT,
    is_anchor BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER,
    status VARCHAR(50) NOT NULL,
    source_path VARCHAR(255),
    published_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 2. Criação de Contents (Editorial)
CREATE TABLE contents (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    body TEXT,
    category VARCHAR(100),
    status VARCHAR(50) NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER,
    source_path VARCHAR(255),
    published_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 3. Criação de Learning Events (Eventos Dinâmicos Github/Worker)
CREATE TABLE learning_events (
    id BIGSERIAL PRIMARY KEY,
    external_id VARCHAR(255) UNIQUE NOT NULL,
    repository_name VARCHAR(255) NOT NULL,
    repository_url VARCHAR(255),
    pull_request_number INTEGER,
    pull_request_url VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    technical_category VARCHAR(100),
    event_date TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    is_auto_published BOOLEAN DEFAULT FALSE,
    raw_source_reference TEXT,
    processed_at TIMESTAMP,
    published_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 4. Criação de Project Links (Conectores Dependentes)
CREATE TABLE project_links (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    link_type VARCHAR(50) NOT NULL,
    display_order INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 5. Criação de Content Links (Conectores Dependentes)
CREATE TABLE content_links (
    id BIGSERIAL PRIMARY KEY,
    content_id BIGINT NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    link_type VARCHAR(50) NOT NULL,
    display_order INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 6. Rastreamento Editorial
CREATE TABLE content_sync_runs (
    id BIGSERIAL PRIMARY KEY,
    started_at TIMESTAMP NOT NULL,
    finished_at TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    items_processed INTEGER DEFAULT 0,
    items_created INTEGER DEFAULT 0,
    items_updated INTEGER DEFAULT 0,
    items_failed INTEGER DEFAULT 0,
    trigger_type VARCHAR(50),
    log_summary TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 7. Rastreamento de Automação Java (Learning in Public)
CREATE TABLE learning_sync_runs (
    id BIGSERIAL PRIMARY KEY,
    started_at TIMESTAMP NOT NULL,
    finished_at TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    repositories_checked INTEGER DEFAULT 0,
    pull_requests_found INTEGER DEFAULT 0,
    items_created INTEGER DEFAULT 0,
    items_updated INTEGER DEFAULT 0,
    items_failed INTEGER DEFAULT 0,
    trigger_type VARCHAR(50),
    log_summary TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- CRIAÇÃO DE ÍNDICES RECOMENDADOS (Performance de Leitura)
-- ==============================================================================
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_contents_status ON contents(status);
CREATE INDEX idx_learning_events_status ON learning_events(status);

CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_contents_display_order ON contents(display_order);

CREATE INDEX idx_learning_events_date ON learning_events(event_date);
CREATE INDEX idx_learning_events_published_at ON learning_events(published_at);

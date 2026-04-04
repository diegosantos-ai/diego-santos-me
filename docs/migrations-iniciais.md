# Migrations Iniciais — Portfólio Profissional Diego Santos

## Objetivo

Definir o escopo da primeira leva de migrations do banco de dados da v1, alinhando criação de tabelas, restrições mínimas e ordem de evolução do schema inicial.

Este documento não substitui os arquivos reais de migration. Ele serve como contrato de modelagem inicial.

---

## 1. Escopo da Primeira Versão do Schema

A primeira versão do schema deve contemplar apenas o necessário para sustentar:

* projetos públicos;
* conteúdos editoriais;
* links associados;
* eventos do Learning in Public;
* rastreamento básico de sincronização.

### Entidades incluídas na primeira leva

* `projects`
* `project_links`
* `contents`
* `content_links`
* `learning_events`
* `content_sync_runs`
* `learning_sync_runs`

---

## 2. Ordem Recomendada das Migrations

A sequência inicial deve respeitar dependências simples e facilitar rollback lógico.

### Ordem sugerida

1. criação de `projects`
2. criação de `contents`
3. criação de `learning_events`
4. criação de `project_links`
5. criação de `content_links`
6. criação de `content_sync_runs`
7. criação de `learning_sync_runs`
8. criação de índices e constraints complementares

### Motivo

* primeiro criar entidades-base;
* depois criar tabelas dependentes;
* por fim reforçar restrições e performance mínima.

---

## 3. Migration 001 — `projects`

### Objetivo

Criar a tabela responsável pelos projetos públicos exibidos no portfólio.

### Campos esperados

* `id`
* `slug`
* `name`
* `short_description`
* `problem`
* `solution`
* `technical_highlights`
* `architecture_summary`
* `stack_summary`
* `is_anchor`
* `is_featured`
* `display_order`
* `status`
* `source_path`
* `published_at`
* `created_at`
* `updated_at`

### Regras mínimas

* `id` como chave primária;
* `slug` único;
* `name` obrigatório;
* `status` obrigatório;
* `created_at` e `updated_at` obrigatórios.

---

## 4. Migration 002 — `contents`

### Objetivo

Criar a tabela de conteúdos editoriais publicados pela aplicação.

### Campos esperados

* `id`
* `slug`
* `title`
* `summary`
* `body`
* `category`
* `status`
* `is_featured`
* `display_order`
* `source_path`
* `published_at`
* `created_at`
* `updated_at`

### Regras mínimas

* `id` como chave primária;
* `slug` único;
* `title` obrigatório;
* `status` obrigatório;
* `created_at` e `updated_at` obrigatórios.

---

## 5. Migration 003 — `learning_events`

### Objetivo

Criar a tabela de eventos dinâmicos do bloco Learning in Public.

### Campos esperados

* `id`
* `external_id`
* `repository_name`
* `repository_url`
* `pull_request_number`
* `pull_request_url`
* `title`
* `summary`
* `technical_category`
* `event_date`
* `status`
* `is_auto_published`
* `raw_source_reference`
* `processed_at`
* `published_at`
* `created_at`
* `updated_at`

### Regras mínimas

* `id` como chave primária;
* `external_id` único;
* `repository_name` obrigatório;
* `status` obrigatório;
* `created_at` e `updated_at` obrigatórios.

---

## 6. Migration 004 — `project_links`

### Objetivo

Criar a tabela de links associados a projetos.

### Campos esperados

* `id`
* `project_id`
* `label`
* `url`
* `link_type`
* `display_order`
* `created_at`
* `updated_at`

### Regras mínimas

* `id` como chave primária;
* `project_id` como chave estrangeira obrigatória;
* `url` obrigatória;
* `link_type` obrigatório.

### Integridade

* `project_id` referencia `projects.id`;
* exclusão e atualização devem respeitar política definida na implementação.

---

## 7. Migration 005 — `content_links`

### Objetivo

Criar a tabela de links associados a conteúdos.

### Campos esperados

* `id`
* `content_id`
* `label`
* `url`
* `link_type`
* `display_order`
* `created_at`
* `updated_at`

### Regras mínimas

* `id` como chave primária;
* `content_id` como chave estrangeira obrigatória;
* `url` obrigatória;
* `link_type` obrigatório.

### Integridade

* `content_id` referencia `contents.id`.

---

## 8. Migration 006 — `content_sync_runs`

### Objetivo

Criar tabela de rastreamento das sincronizações editoriais.

### Campos esperados

* `id`
* `started_at`
* `finished_at`
* `status`
* `items_processed`
* `items_created`
* `items_updated`
* `items_failed`
* `trigger_type`
* `log_summary`
* `created_at`

### Regras mínimas

* `id` como chave primária;
* `started_at` obrigatório;
* `status` obrigatório;
* `created_at` obrigatório.

---

## 9. Migration 007 — `learning_sync_runs`

### Objetivo

Criar tabela de rastreamento das execuções do worker do Learning in Public.

### Campos esperados

* `id`
* `started_at`
* `finished_at`
* `status`
* `repositories_checked`
* `pull_requests_found`
* `items_created`
* `items_updated`
* `items_failed`
* `trigger_type`
* `log_summary`
* `created_at`

### Regras mínimas

* `id` como chave primária;
* `started_at` obrigatório;
* `status` obrigatório;
* `created_at` obrigatório.

---

## 10. Índices Iniciais Recomendados

A primeira versão deve incluir índices simples voltados a leitura pública e operação do worker.

### Índices recomendados

* índice único em `projects.slug`
* índice único em `contents.slug`
* índice único em `learning_events.external_id`
* índice em `projects.status`
* índice em `contents.status`
* índice em `learning_events.status`
* índice em `projects.display_order`
* índice em `contents.display_order`
* índice em `learning_events.event_date`
* índice em `learning_events.published_at`

### Motivo

* melhorar leitura da Home e listagens;
* facilitar ordenação editorial;
* melhorar rastreamento dos eventos dinâmicos.

---

## 11. Constraints Recomendadas

### Unicidade

* `projects.slug` único
* `contents.slug` único
* `learning_events.external_id` único

### Integridade referencial

* `project_links.project_id` obrigatório
* `content_links.content_id` obrigatório

### Integridade semântica mínima

* `status` obrigatório nas entidades públicas e operacionais;
* timestamps mínimos obrigatórios nas tabelas principais.

---

## 12. Política de Status no Schema

As tabelas devem aceitar status explícitos, não implícitos.

### Status editoriais

Para `projects` e `contents`:

* `draft`
* `published`
* `hidden`

### Status dinâmicos

Para `learning_events`:

* `pending`
* `published`
* `hidden`
* `discarded`
* `failed`

### Status operacionais

Para `content_sync_runs` e `learning_sync_runs`:

* `running`
* `success`
* `partial_success`
* `failed`

---

## 13. Dados Iniciais da v1

A primeira carga de dados da v1 deve contemplar:

* Nexo 360 como projeto-âncora;
* projetos em destaque selecionados;
* conteúdos editoriais iniciais, se já existirem;
* nenhum dado fake apenas para preencher a base.

### Regra

Dados iniciais devem refletir conteúdo real do portfólio e não placeholders permanentes.

---

## 14. Estratégia de Evolução

A primeira leva de migrations deve ser propositalmente enxuta.

### Não incluir agora

* taxonomia avançada;
* tags normalizadas;
* workflow editorial multiusuário;
* tabela de usuários administrativos;
* versionamento de conteúdo no banco;
* comentários;
* mídia complexa.

### Motivo

Evitar schema prematuro e reduzir atrito na v1.

---

## 15. Critério de Aceite da Primeira Leva

A primeira leva de migrations será considerada suficiente quando:

* o schema suportar projetos, conteúdos e Learning in Public;
* houver integridade mínima entre entidades e links;
* houver unicidade para slugs e eventos externos;
* a sincronização editorial puder registrar suas execuções;
* o worker puder registrar suas execuções;
* a aplicação conseguir ler os dados públicos sem necessidade de tabelas adicionais.

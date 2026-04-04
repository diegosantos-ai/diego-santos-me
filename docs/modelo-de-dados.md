# Modelo de Dados — Portfólio Profissional Diego Santos

## Objetivo

Definir o modelo de dados inicial da v1 do portfólio profissional, estabelecendo as principais entidades, seus papéis, relações e regras mínimas de integridade.

Este documento descreve o desenho lógico inicial. Ele não substitui a modelagem física final nem as migrations do banco.

---

## 1. Princípios do Modelo

O modelo de dados da v1 deve atender aos seguintes objetivos:

* suportar conteúdo editorial versionado em Markdown com leitura operacional via banco;
* persistir projetos, conteúdos e eventos do Learning in Public;
* separar edição humana de publicação operacional;
* permitir controle de status, ordem, destaque e visibilidade;
* registrar sincronização e processamento sem depender apenas de arquivos estáticos.

### Diretrizes

* o banco é a fonte operacional de leitura da aplicação;
* o repositório versionado é a fonte humana de edição para o conteúdo editorial;
* entidades devem ter identificador estável;
* status e visibilidade devem ser explícitos;
* links externos devem ser persistidos de forma estruturada;
* eventos dinâmicos devem ser rastreáveis e não duplicáveis.

---

## 2. Visão Geral das Entidades

O modelo lógico inicial da v1 é composto pelas seguintes entidades principais:

* `projects`
* `project_links`
* `contents`
* `content_links`
* `learning_events`
* `content_sync_runs`
* `learning_sync_runs`

Entidades auxiliares podem ser adicionadas depois, mas a v1 deve permanecer simples e orientada à operação real.

---

## 3. Entidade `projects`

## Finalidade

Representa os projetos públicos exibidos no portfólio, incluindo o projeto-âncora e os projetos em destaque.

### Campos sugeridos

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

### Regras

* `slug` deve ser único.
* apenas um projeto deve estar marcado como `is_anchor = true` na v1.
* `display_order` deve controlar a ordem editorial dos projetos em destaque.
* `status` deve suportar ao menos:

  * `draft`
  * `published`
  * `hidden`
* `source_path` deve guardar referência ao arquivo Markdown de origem, quando aplicável.

### Observações

* `technical_highlights`, `architecture_summary` e `stack_summary` podem ser armazenados como texto estruturado na v1.
* se houver necessidade futura, esses campos podem ser extraídos para tabelas próprias.

---

## 4. Entidade `project_links`

## Finalidade

Armazenar links relacionados a cada projeto, como repositório, documentação, demo ou material complementar.

### Campos sugeridos

* `id`
* `project_id`
* `label`
* `url`
* `link_type`
* `display_order`
* `created_at`
* `updated_at`

### Regras

* cada link pertence a um único projeto.
* `link_type` deve permitir ao menos:

  * `repository`
  * `documentation`
  * `demo`
  * `article`
  * `other`
* um projeto pode ter vários links.

### Relação

* `projects 1:N project_links`

---

## 5. Entidade `contents`

## Finalidade

Representa conteúdos editoriais publicados no portfólio, como notas técnicas, estudos aplicados, artigos curtos ou registros públicos derivados do repositório.

### Campos sugeridos

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

### Regras

* `slug` deve ser único.
* `status` deve suportar ao menos:

  * `draft`
  * `published`
  * `hidden`
* `source_path` deve apontar para o Markdown de origem quando o conteúdo vier do repositório.
* `body` pode armazenar conteúdo convertido e pronto para renderização operacional.

### Observações

* `category` pode começar como campo textual simples na v1.
* se a taxonomia crescer, pode virar entidade própria em fase posterior.

---

## 6. Entidade `content_links`

## Finalidade

Armazenar links associados a conteúdos editoriais.

### Campos sugeridos

* `id`
* `content_id`
* `label`
* `url`
* `link_type`
* `display_order`
* `created_at`
* `updated_at`

### Regras

* cada link pertence a um único conteúdo.
* `link_type` deve suportar ao menos:

  * `repository`
  * `reference`
  * `article`
  * `video`
  * `other`

### Relação

* `contents 1:N content_links`

---

## 7. Entidade `learning_events`

## Finalidade

Representa os eventos dinâmicos do bloco Learning in Public, processados a partir de pull requests merged.

### Campos sugeridos

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

### Regras

* `external_id` deve ser único para impedir duplicidade de processamento.
* `status` deve suportar ao menos:

  * `pending`
  * `published`
  * `hidden`
  * `discarded`
  * `failed`
* apenas eventos com `status = published` devem aparecer publicamente.
* `technical_category` deve armazenar a classificação resumida do evento.
* `raw_source_reference` deve permitir rastrear a origem técnica do item processado.

### Observações

* `external_id` pode ser composto a partir de repositório + número do PR ou identificador global da origem.
* `summary` deve armazenar o texto final aprovado para exibição pública.

---

## 8. Entidade `content_sync_runs`

## Finalidade

Registrar execuções do processo de sincronização de conteúdo editorial do repositório para o banco.

### Campos sugeridos

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

### Regras

* `status` deve suportar ao menos:

  * `running`
  * `success`
  * `partial_success`
  * `failed`
* `trigger_type` deve suportar ao menos:

  * `deploy`
  * `manual`
  * `scheduled`

### Objetivo operacional

* dar rastreabilidade ao fluxo editorial;
* facilitar troubleshooting quando um Markdown não for sincronizado corretamente.

---

## 9. Entidade `learning_sync_runs`

## Finalidade

Registrar execuções do processo agendado do Learning in Public.

### Campos sugeridos

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

### Regras

* `status` deve suportar ao menos:

  * `running`
  * `success`
  * `partial_success`
  * `failed`
* `trigger_type` deve suportar ao menos:

  * `scheduled`
  * `manual`

### Objetivo operacional

* registrar a saúde do processamento dinâmico;
* facilitar observabilidade e diagnóstico do worker.

---

## 10. Relações do Modelo

### Relações principais

* `projects 1:N project_links`
* `contents 1:N content_links`

### Relações independentes de operação

* `learning_events` não depende diretamente de `contents` na v1.
* `content_sync_runs` e `learning_sync_runs` funcionam como entidades de rastreabilidade operacional.

### Motivo da separação

* manter o Learning in Public desacoplado do conteúdo editorial tradicional;
* evitar mistura entre publicação manual e evento técnico dinâmico;
* simplificar a operação da v1.

---

## 11. Regras de Integridade

O modelo deve respeitar no mínimo as seguintes regras:

### Identificadores e unicidade

* `projects.slug` único
* `contents.slug` único
* `learning_events.external_id` único

### Chaves estrangeiras

* `project_links.project_id` deve referenciar `projects.id`
* `content_links.content_id` deve referenciar `contents.id`

### Regras editoriais

* apenas um projeto-âncora publicado na v1
* apenas registros publicados devem aparecer publicamente
* registros ocultos ou em rascunho não devem ser renderizados no front público

### Regras do Learning in Public

* um PR processado não deve gerar múltiplos eventos duplicados
* falhas de processamento devem ficar registradas
* publicação automática deve respeitar configuração do ambiente

---

## 12. Status e Visibilidade

### Status editoriais sugeridos

Para `projects` e `contents`:

* `draft`
* `published`
* `hidden`

### Status dinâmicos sugeridos

Para `learning_events`:

* `pending`
* `published`
* `hidden`
* `discarded`
* `failed`

### Diretriz

Status não deve ser inferido por ausência de data ou campo nulo. O estado de publicação deve ser explícito.

---

## 13. Estratégia de Slugs

### Regra

Toda entidade pública deve possuir `slug` ou identificador estável equivalente.

### Aplicação

* projetos usam `slug` para roteamento e referência
* conteúdos usam `slug` para leitura e indexação
* learning events usam `external_id` como unicidade operacional e podem ter `slug` futuro se a funcionalidade crescer

### Diretriz

Slugs devem ser previsíveis, legíveis e estáveis após publicação.

---

## 14. Estratégia de Timestamps

Todas as entidades principais devem ter timestamps mínimos para auditoria operacional.

### Campos recomendados

* `created_at`
* `updated_at`

### Campos adicionais por contexto

* `published_at`
* `processed_at`
* `started_at`
* `finished_at`
* `event_date`

### Motivo

* rastreabilidade;
* ordenação;
* troubleshooting;
* comparação entre origem e publicação.

---

## 15. Estratégia de Evolução do Modelo

A v1 deve começar simples, evitando normalização excessiva prematura.

### Pode permanecer textual na v1

* categorias editoriais
* destaques técnicos
* resumo de arquitetura
* stack resumida
* log resumido das execuções

### Pode ser extraído depois, se crescer

* taxonomias
* tags
* autores
* tabelas de mídia
* tabelas de assets
* workflow editorial avançado
* versionamento interno de conteúdo no banco

### Diretriz

A evolução do modelo deve ser orientada por necessidade operacional real, não por antecipação genérica.

---

## 16. Entidades Fora do Escopo da v1

As seguintes entidades não são obrigatórias para a primeira versão:

* usuários administrativos
* permissões e RBAC interno
* comentários
* analytics customizado avançado
* workflow editorial multi-etapa
* versionamento histórico completo de cada conteúdo no banco
* mídia complexa com biblioteca própria

### Motivo

* manter foco em posicionamento, publicação, automação e operação básica.

---

## 17. Resumo do Modelo Inicial

### Núcleo editorial

* `projects`
* `project_links`
* `contents`
* `content_links`

### Núcleo dinâmico

* `learning_events`

### Núcleo operacional

* `content_sync_runs`
* `learning_sync_runs`

### Resultado esperado

Esse modelo permite:

* publicar projetos e conteúdos com controle editorial;
* sincronizar Markdown versionado com base operacional;
* exibir Learning in Public com rastreabilidade;
* evitar duplicidade de eventos;
* sustentar a v1 com PostgreSQL sem inflar o escopo de dados.

---

## 18. Próximos Artefatos Recomendados

A partir deste modelo, os próximos documentos mais úteis são:

* `topologia-deploy.md`
* `runbook-deploy.md`
* `runbook-backup-restore.md`
* `adr-learning-in-public.md`
* `migrations-iniciais.md`

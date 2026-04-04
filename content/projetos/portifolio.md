---
title: "Portfólio Profissional"
description: "Plataforma de portfólio DevOps com CI/CD, Observabilidade e Backend Java."
slug: "portifolio"
featured: true
order: 6
tags: ["Next.js", "Java", "Spring Boot", "Docker"]
---

# Portfólio Profissional — Diego Santos

![Next.js](https://img.shields.io/badge/Next.js-app-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-typed-3178C6?logo=typescript\&logoColor=white)
![Java](https://img.shields.io/badge/Java_21-backend-007396?logo=java\&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-framework-6DB33F?logo=spring-boot\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-data-4169E1?logo=postgresql\&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-compose-2496ED?logo=docker\&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-reverse--proxy-009639?logo=nginx\&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-metrics-E6522C?logo=prometheus\&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-dashboards-F46800?logo=grafana\&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=github-actions\&logoColor=white)

## Visão Geral

Este repositório concentra a reconstrução do portfólio profissional de Diego Santos.

O objetivo do projeto é apresentar, de forma clara e verificável, uma proposta profissional centrada em:

* backend;
* automação;
* integração;
* observabilidade;
* arquitetura aplicada;
* operação de sistemas.

O projeto não é tratado como site estático isolado. A v1 foi desenhada como uma aplicação pequena, mas operável, com deploy automatizado, persistência, observabilidade básica e separação entre conteúdo editorial e processamento assíncrono.

## Objetivo do Projeto

O problema central deste projeto é de comunicação profissional.

A versão anterior do portfólio não refletia com precisão a evolução do perfil técnico, nem destacava com clareza:

* os tipos de problema resolvidos;
* os projetos que melhor demonstram maturidade técnica;
* a combinação entre engenharia, automação e operação;
* a direção de evolução para contexto corporativo.

A v1 deste repositório reorganiza essa narrativa em cinco áreas principais:

* Home
* Projetos
* Sobre
* Conteúdos
* Contato

Além disso, introduz o bloco **Learning in Public**, que transforma pull requests merged em registros curtos de aprendizado técnico com exibição pública controlada.

## Escopo da v1

A primeira versão contempla:

* navegação principal completa;
* Home com hero, stack principal, Learning in Public e indicadores estáticos;
* Nexo 360 como projeto-âncora;
* projetos em destaque;
* seção Sobre;
* seção Conteúdos;
* seção Contato;
* banco operacional em PostgreSQL;
* sincronização de conteúdo versionado em Markdown;
* backend Java (`portfolio-api-java`) rodando Spring Boot para orquestrar o Learning in Public e rotinas de leitura;
* observabilidade mínima viável;
* deploy automatizado.

Ficam fora da v1:

* CMS completo;
* painel administrativo completo;
* workflow editorial complexo;
* analytics avançado;
* internacionalização;
* múltiplas fontes dinâmicas além do escopo definido para o Learning in Public.

## Arquitetura

A arquitetura da v1 foi definida para privilegiar:

* separação de responsabilidades;
* reprodutibilidade;
* deploy controlado;
* persistência explícita;
* observabilidade;
* evolução incremental.

### Componentes principais

* `nginx`: entrada pública, TLS, redirecionamentos e reverse proxy;
* `web-app`: aplicação web pública (Next.js);
* `portfolio-api-java`: serviço backend real (Java 21 + Spring Boot), responsável pelo núcleo dinâmico do Learning in Public e endpoints internos;
* `postgres`: persistência operacional;
* `promtail`, `loki`, `prometheus`, `grafana`: stack de observabilidade.

### Diretrizes principais

* conteúdo editorial é editado em Markdown e sincronizado para o banco;
* o banco é a fonte operacional de leitura da aplicação;
* o Learning in Public não depende de chamadas em tempo real ao GitHub durante renderização da Home;
* o deploy é automatizado a partir de merge na `main`.

## Stack

### Aplicação Front/Web

* Next.js
* React
* TypeScript

### Serviço Backend

* Java 21
* Spring Boot
* Gradle

### Persistência

* PostgreSQL

### Runtime e entrega

* Docker
* Docker Compose
* Nginx
* GitHub Actions

### Observabilidade

* Promtail
* Loki
* Prometheus
* Grafana

### Integrações

* GitHub API
* provedor LLM para enriquecimento controlado do Learning in Public

## Estrutura Conceitual

A organização lógica da aplicação é composta por três núcleos:

### 1. Núcleo editorial

Responsável por projetos, conteúdos, links e metadados publicados.

### 2. Núcleo dinâmico

Responsável pelo Learning in Public a partir de PRs merged.

### 3. Núcleo operacional

Responsável por deploy, sincronização, observabilidade, backup e rastreabilidade mínima.

## Learning in Public

O bloco Learning in Public é uma funcionalidade editorial e operacional da v1.

Ele segue as seguintes regras:

* lê apenas pull requests merged;
* começa com um ou poucos repositórios;
* é executado por rotina agendada;
* gera resumo curto, categoria técnica e link;
* persiste os eventos processados no banco;
* suporta publicação automática ou revisão manual por configuração.

A Home exibe apenas itens publicados.

O objetivo desse bloco é transformar atividade técnica real em evidência pública de execução, sem depender de linguagem promocional ou feed social.

## Modelo de Dados

O schema inicial da v1 cobre as seguintes entidades:

* `projects`
* `project_links`
* `contents`
* `content_links`
* `learning_events`
* `content_sync_runs`
* `learning_sync_runs`

Esse modelo sustenta:

* publicação de projetos e conteúdos;
* persistência do Learning in Public;
* rastreamento de sincronização;
* controle de status e visibilidade.

## Deploy

A estratégia de deploy da v1 segue o fluxo:

1. alteração aprovada entra em `main`;
2. GitHub Actions executa lint, testes, build e validações básicas de segurança;
3. a imagem da aplicação é publicada em registry;
4. a VPS atualiza os containers via Docker Compose;
5. o ambiente é validado por healthchecks e checagem operacional mínima.

### Regras operacionais

* o servidor não é tratado como ambiente principal de build manual;
* PostgreSQL não é exposto publicamente;
* apenas o reverse proxy recebe tráfego externo;
* observabilidade e backup fazem parte do desenho da v1.

## Observabilidade

A v1 inclui observabilidade mínima viável com:

* logs estruturados;
* coleta por Promtail;
* consulta via Loki;
* métricas via Prometheus;
* dashboards via Grafana.

Os sinais mínimos esperados incluem:

* disponibilidade da aplicação (`web-app`);
* taxa de erro;
* latência;
* execução e estabilidade do `portfolio-api-java`;
* falhas de sincronização;
* saúde dos serviços principais.

## Segurança

As regras mínimas do projeto são:

* nenhum secret versionado no repositório;
* configuração por variáveis de ambiente;
* segredos reais apenas em ambiente seguro;
* TLS obrigatório;
* PostgreSQL sem exposição pública;
* Grafana protegido;
* deploy via SSH por chave;
* validações de segurança básicas no pipeline.

## Conteúdo e Edição

A edição do conteúdo da v1 é feita em arquivos Markdown versionados no repositório.

A aplicação não depende diretamente desses arquivos em runtime. O conteúdo é sincronizado para o PostgreSQL, que passa a ser a base operacional de leitura do front.

Essa decisão foi adotada para manter:

* edição simples;
* versionamento por Git;
* rastreabilidade;
* controle editorial;
* flexibilidade de renderização.

## Documentação do Projeto

A base documental da v1 está organizada nos seguintes artefatos:

* `contexto.md`
* `arquitetura.md`
* `decisoes-arquiteturais.md`
* `requisitos-funcionais.md`
* `modelo-de-dados.md`
* `topologia-deploy.md`
* `runbook-deploy.md`
* `runbook-backup-restore.md`
* `adr-learning-in-public.md`
* `checklist-producao-v1.md`
* `migrations-iniciais.md`
* `matriz-de-variaveis-de-ambiente.md`

Esses documentos formam a referência técnica da v1.

## Estado Atual

Neste estágio, o repositório está organizado para:

* consolidar a arquitetura da v1;
* transformar documentação em artefatos executáveis;
* preparar ambiente, schema, runtime e pipeline;
* sustentar implementação incremental sem reescrita total.

## Próximos Passos

Os próximos passos naturais do projeto são:

* definir `.env.example`;
* montar o `docker-compose.yml` real da v1;
* implementar schema e migrations reais;
* estruturar o `web-app` (Next.js) e o `portfolio-api-java` (Spring Boot);
* configurar pipeline de CI/CD para compilar ambas as stacks em containers;
* validar deploy ponta a ponta na VPS.

## Licença e Uso

Este repositório é parte do portfólio profissional de Diego Santos e serve como ativo técnico público para demonstrar arquitetura, automação, operação e evolução de projeto.

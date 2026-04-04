# Requisitos Funcionais — Portfólio Profissional Diego Santos

## Objetivo

Definir o comportamento funcional esperado da v1 do portfólio profissional, descrevendo o que o sistema deve fazer do ponto de vista do usuário, da edição de conteúdo e da operação dos componentes principais.

Este documento não detalha implementação. Ele descreve capacidades obrigatórias da aplicação.

---

## 1. Navegação Global

### RF-01 — Navegação principal

O sistema deve exibir no topo da interface uma navegação principal com as seguintes seções:

* Home
* Projetos
* Sobre
* Conteúdos
* Contato

### RF-02 — Acesso entre seções

O usuário deve conseguir acessar qualquer seção principal a partir da navegação global, com comportamento consistente em desktop e mobile.

### RF-03 — Destaque de seção atual

O sistema deve indicar visualmente a seção ativa ou o ponto atual de navegação, quando aplicável.

### RF-04 — Navegação responsiva

O sistema deve oferecer navegação adaptada para telas menores, preservando legibilidade e acesso às áreas principais do site.

---

## 2. Home

### RF-05 — Hero principal

A Home deve exibir uma seção hero com:

* tag line principal;
* linha de apoio curta;
* botão “Ver projetos”;
* botão “Fale comigo”.

### RF-06 — Direcionamento do CTA de projetos

Ao acionar o botão “Ver projetos”, o usuário deve ser levado à seção ou página de projetos.

### RF-07 — Direcionamento do CTA de contato

Ao acionar o botão “Fale comigo”, o usuário deve ser levado à seção ou página de contato.

### RF-08 — Exibição da stack principal

A Home deve exibir a stack principal do portfólio logo abaixo da seção hero, em formato sintético e de leitura rápida.

### RF-09 — Exibição do bloco Learning in Public

A Home deve exibir um bloco chamado Learning in Public com:

* título;
* subtítulo;
* coleção de cards ou itens dinâmicos;
* acesso ao conteúdo individual de cada item.

### RF-10 — Exibição de indicadores estáticos

A Home deve exibir quatro indicadores estáticos de volume ou evidência técnica, como quantidade de projetos, automações, integrações, conteúdos ou equivalentes.

### RF-11 — Destaque do projeto-âncora

A Home pode exibir uma chamada resumida para o projeto-âncora, direcionando o usuário para a seção Projetos.

---

## 3. Projetos

### RF-12 — Exibição do projeto-âncora

A seção Projetos deve destacar o projeto principal Nexo 360 como case central da v1.

### RF-13 — Estrutura do case principal

O case principal deve exibir, no mínimo:

* nome do projeto;
* descrição curta;
* problema;
* solução;
* destaques técnicos;
* visão de arquitetura;
* link para repositório.

### RF-14 — Exibição de projetos em destaque

A seção Projetos deve exibir uma lista de projetos em destaque selecionados do portfólio.

### RF-15 — Estrutura mínima de projeto em destaque

Cada projeto em destaque deve exibir, no mínimo:

* nome;
* descrição curta;
* tecnologias ou categorias principais;
* link para repositório e/ou documentação.

### RF-16 — Ordem editorial dos projetos

O sistema deve permitir definir a ordem de exibição dos projetos em destaque.

### RF-17 — Ativação e desativação de projetos

O sistema deve permitir que um projeto seja marcado como visível ou oculto sem remoção definitiva do conteúdo-fonte.

---

## 4. Sobre

### RF-18 — Exibição do posicionamento profissional

A seção Sobre deve apresentar o posicionamento profissional atual de Diego de forma objetiva.

### RF-19 — Exibição dos diferenciais

A seção Sobre deve exibir diferenciais profissionais relacionados a backend, automação, integração, operação e arquitetura aplicada.

### RF-20 — Exibição da direção de evolução

A seção Sobre deve comunicar a direção atual de evolução profissional, incluindo a ponte para contexto corporativo e stack-alvo.

---

## 5. Conteúdos

### RF-21 — Listagem de conteúdos publicados

A seção Conteúdos deve exibir uma listagem dos conteúdos técnicos publicados.

### RF-22 — Estrutura mínima de item de conteúdo

Cada item de conteúdo deve exibir, no mínimo:

* título;
* descrição curta ou resumo;
* categoria ou tema;
* data;
* link para leitura completa, quando aplicável.

### RF-23 — Ordenação de conteúdos

O sistema deve permitir ordenar conteúdos por critério editorial, priorizando conteúdo mais recente ou mais relevante.

### RF-24 — Publicação controlada

O sistema deve permitir definir se um conteúdo está publicado, em rascunho ou oculto.

### RF-25 — Origem do conteúdo

O sistema deve aceitar conteúdo originado de arquivos Markdown versionados no repositório.

---

## 6. Contato

### RF-26 — Exibição dos canais de contato

A seção Contato deve exibir meios de contato profissionais, incluindo ao menos:

* e-mail;
* GitHub;
* LinkedIn.

### RF-27 — Acesso rápido ao contato

O usuário deve conseguir chegar à seção Contato a partir da navegação global e do CTA principal da Home.

---

## 7. Gestão de Conteúdo Editorial

### RF-28 — Ingestão de conteúdo em Markdown

O sistema deve ser capaz de ler conteúdo versionado em Markdown e transformá-lo em registros operacionais consumidos pela aplicação.

### RF-29 — Sincronização editorial

O sistema deve sincronizar o conteúdo-fonte do repositório com o banco de dados em processo controlado de deploy ou rotina interna equivalente.

### RF-30 — Metadados editoriais

O sistema deve suportar metadados editoriais por item, incluindo ao menos:

* slug;
* título;
* status;
* data;
* categoria;
* ordem;
* destaque;
* links associados.

### RF-31 — Slug por item

Cada projeto, conteúdo ou registro público deve possuir identificador estável para roteamento, referência ou integração.

### RF-32 — Controle de visibilidade

O sistema deve permitir controlar visibilidade por item sem exigir exclusão do conteúdo-fonte.

---

## 8. Learning in Public

### RF-33 — Coleta de eventos do GitHub

O sistema deve coletar eventos técnicos a partir de pull requests merged em um ou poucos repositórios configurados.

### RF-34 — Execução agendada

A coleta e processamento do Learning in Public devem ocorrer por rotina agendada.

### RF-35 — Processamento de eventos

Para cada pull request elegível, o sistema deve ser capaz de gerar:

* resumo curto;
* categoria técnica;
* link para repositório ou PR;
* data do evento;
* status de publicação.

### RF-36 — Persistência do Learning in Public

Os eventos processados do Learning in Public devem ser persistidos no banco de dados.

### RF-37 — Prevenção de duplicidade

O sistema deve impedir reprocessamento duplicado do mesmo pull request já tratado.

### RF-38 — Revisão manual opcional

O sistema deve permitir que a publicação dos itens do Learning in Public ocorra em modo automático ou sob revisão manual.

### RF-39 — Controle de publicação

O sistema deve permitir que um item do Learning in Public seja marcado como:

* pendente;
* publicado;
* oculto;
* descartado.

### RF-40 — Exibição pública dos itens

A Home deve exibir apenas itens publicados do Learning in Public.

### RF-41 — Clique no item

Ao clicar em um item do Learning in Public, o usuário deve ser direcionado para o link associado ao repositório, pull request ou referência técnica correspondente.

### RF-42 — Ordem dos itens dinâmicos

O sistema deve permitir ordenar a exibição dos itens do Learning in Public por recência ou regra editorial definida.

### RF-43 — Registro de falhas

O sistema deve registrar falhas de coleta, transformação ou publicação dos eventos do Learning in Public para suporte operacional.

---

## 9. Administração Operacional da Aplicação

### RF-44 — Inicialização por containers

O sistema deve poder ser iniciado por composição de containers, incluindo aplicação, banco e serviços auxiliares definidos para a v1.

### RF-45 — Configuração por ambiente

O sistema deve ler configuração por variáveis de ambiente, sem dependência de valores hardcoded em código.

### RF-46 — Healthcheck da aplicação

O sistema deve expor mecanismo de verificação de saúde da aplicação para suporte ao deploy e à observabilidade.

### RF-47 — Healthcheck do portfolio-api-java

O sistema deve expor endpoints de `/actuator/health` ou similar dentro do serviço Spring Boot (`portfolio-api-java`) para validar a saúde do processamento dinâmico.

### RF-48 — Logs estruturados

O sistema deve emitir logs estruturados tanto para o `web-app` principal quanto para a API Java `portfolio-api-java`.

---

## 10. Banco de Dados

### RF-49 — Persistência de entidades principais

O sistema deve persistir no banco de dados, no mínimo, as seguintes entidades:

* projetos;
* conteúdos;
* metadados editoriais;
* eventos do Learning in Public;
* status de publicação e sincronização.

### RF-50 — Controle de migrations

A aplicação deve suportar mecanismo controlado de evolução de schema do banco.

### RF-51 — Integridade mínima dos dados

O sistema deve garantir integridade mínima entre conteúdo, status, slugs e links associados.

---

## 11. Deploy

### RF-52 — Pipeline automatizada

O sistema deve ser entregue por pipeline automatizada acionada por merge na branch principal.

### RF-53 — Etapas mínimas da pipeline

A pipeline deve executar, no mínimo:

* lint;
* testes;
* build;
* validação básica de segurança;
* deploy.

### RF-54 — Atualização remota da VPS

O deploy deve atualizar a aplicação na VPS por estratégia automatizada baseada em imagem publicada e atualização remota dos containers.

### RF-55 — Sincronização de conteúdo no deploy

O processo de deploy deve incluir ou acionar o fluxo necessário para manter conteúdo editorial sincronizado com a base operacional.

---

## 12. Regras de Escopo da v1

### RF-56 — Escopo editorial inicial

A v1 deve contemplar as cinco seções principais:

* Home
* Projetos
* Sobre
* Conteúdos
* Contato

### RF-57 — Escopo funcional do Learning in Public

A v1 deve implementar Learning in Public em modo funcional simples, sem necessidade de workflow editorial complexo.

### RF-58 — Ausência de CMS na v1

A v1 não deve depender de CMS externo para operar o conteúdo principal.

### RF-59 — Ausência de painel administrativo completo

A v1 não exige painel administrativo completo para gestão de conteúdo.

### RF-60 — Evolução incremental

As funcionalidades devem ser implementadas de forma que o sistema possa evoluir sem reescrita total da arquitetura.

---

## 13. Critério de Aceite Funcional da v1

A v1 será considerada funcionalmente aceita quando:

* a navegação principal estiver operacional;
* a Home comunicar a proposta principal com clareza;
* o projeto-âncora estiver destacado em Projetos;
* conteúdos publicados puderem ser exibidos a partir da ingestão de Markdown;
* o bloco Learning in Public estiver funcionando com base em PRs merged;
* os links principais de contato estiverem acessíveis;
* o deploy estiver automatizado;
* a aplicação estiver persistindo dados principais no PostgreSQL.

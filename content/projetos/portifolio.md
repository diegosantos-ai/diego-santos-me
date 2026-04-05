---
title: "Portfólio Profissional"
description: "Portfólio construído como produto real, com CI/CD, observabilidade e backend Java para reforçar engenharia, não só apresentação."
slug: "portifolio"
featured: true
order: 6
tags: ["Next.js", "Java", "Spring Boot", "Docker"]
---

Perfeito. Então esse case não deve ser tratado como “um site pessoal simples”, e sim como **um produto real que cumpre dois papéis ao mesmo tempo**:

1. é a sua **página pública de posicionamento profissional**;
2. é também um **projeto de engenharia completo**, usado como evidência prática de arquitetura, backend, automação, CI/CD, observabilidade, operação e evolução para stack corporativa.

Esse enquadramento muda bastante a narrativa. O valor do projeto não está só no visual do portfólio, mas no fato de que o próprio portfólio é um sistema desenhado, operado e publicado com critérios de engenharia.

Abaixo está a versão revisada do case nesse posicionamento.

# Portfólio Profissional

## Aplicação web pública que funciona ao mesmo tempo como página de posicionamento profissional e como projeto real de engenharia, operação e arquitetura

## Introdução

Portfólios técnicos costumam falhar por um motivo simples: mostram tecnologia, mas não comunicam proposta de valor. Em muitos casos, viram uma vitrine genérica de ferramentas, projetos desconectados e textos que não deixam claro o que a pessoa realmente constrói, quais problemas resolve e qual nível de maturidade já demonstrou na prática.

Este projeto foi concebido para resolver exatamente esse problema. A proposta não era criar apenas uma página web bonita, mas reconstruir o portfólio como um sistema real, capaz de comunicar posicionamento profissional com clareza e, ao mesmo tempo, servir como prova concreta de engenharia aplicada. Ou seja: o portfólio é tanto a interface pública da marca profissional quanto um projeto técnico completo, com frontend, backend, banco, CI/CD, observabilidade, deploy, rotinas operacionais e arquitetura evolutiva.

## Problema de negócio

O problema central era de comunicação e credibilidade técnica. A versão anterior do portfólio não traduzia com precisão a evolução profissional, nem deixava evidente, em poucos segundos, quais competências já estavam provadas, qual projeto melhor representava maturidade técnica e como estudo, execução e entrega pública se conectavam. Isso enfraquecia o posicionamento diante de recrutadores, líderes técnicos e gestores de engenharia.

Ao mesmo tempo, havia uma oportunidade maior: transformar o próprio portfólio em um case de engenharia. Em vez de depender de uma página estática sem profundidade operacional, o projeto poderia incorporar banco, backend, sincronização editorial, ingestão de eventos técnicos reais, deploy automatizado, logs estruturados, métricas e runbooks. Com isso, o portfólio deixaria de ser apenas vitrine e passaria a funcionar como evidência pública da forma de pensar e construir sistemas.

## Solução que entrega

A solução foi desenhada como uma aplicação web pública com arquitetura separada por responsabilidades. O frontend em Next.js entrega a experiência pública do site, organizada em cinco áreas principais — Home, Projetos, Sobre, Conteúdos e Contato — enquanto um backend real em Java 21 com Spring Boot processa a parte dinâmica do sistema, especialmente o bloco **Learning in Public**, que transforma pull requests merged em evidências públicas curtas de evolução técnica.

O projeto usa PostgreSQL desde a v1 como base operacional de leitura, persistindo projetos, conteúdos, links, eventos do Learning in Public e rastreamento das sincronizações. O conteúdo editorial continua sendo escrito em Markdown versionado no repositório, mas é sincronizado para o banco para leitura operacional pela aplicação. Isso separa claramente a fonte de edição humana da fonte de leitura pública e indexação.

Na prática, a solução entrega:

* uma aplicação pública que comunica posicionamento profissional com clareza;
* uma seção de projetos com Nexo 360 como projeto-âncora;
* uma área de conteúdos editoriais sincronizados do repositório;
* um bloco dinâmico de Learning in Public baseado em PRs merged;
* deploy automatizado;
* observabilidade mínima viável;
* operação documentada com runbooks, checklist de produção e estratégia de backup/restore.

## Como o projeto melhora a vida da empresa

O primeiro ganho está em **clareza de posicionamento**. O site passa a comunicar rapidamente quem é Diego profissionalmente, o que ele constrói, quais competências já estão demonstradas e como entrar em contato. Isso reduz ruído na avaliação inicial e melhora a qualidade da leitura por recrutadores e lideranças técnicas.

O segundo ganho está em **prova técnica pública**. Diferente de um portfólio estático, este projeto demonstra na prática backend real, modelagem de dados, separação entre serviços, CI/CD, banco, sincronização de conteúdo, observabilidade, segurança mínima e rotinas operacionais. O visitante não vê apenas “texto sobre engenharia”; ele vê um sistema construído com decisões coerentes de arquitetura e operação.

O terceiro ganho está em **evolução incremental sem reescrita total**. Como a aplicação foi desenhada com separação clara entre web-app, backend Java, banco, proxy e stack de observabilidade, ela pode crescer com previsibilidade. Isso permite ampliar conteúdo, sofisticar o Learning in Public, reforçar métricas e evoluir o modelo editorial sem comprometer a base do sistema.

Há ainda um ganho importante de **coerência entre discurso e execução**. O projeto sustenta a narrativa de engenharia aplicada porque ele próprio incorpora preocupações com deploy automatizado, logs estruturados, healthchecks, backup, restore, segurança de segredos, persistência e troubleshooting. Em outras palavras, o portfólio não apenas fala sobre maturidade técnica; ele a encena operacionalmente.

## Fluxo da solução

![Fluxo operacional do Stack de Observabilidade](/images/projects/portfolio-flow-v1.png)

O fluxo editorial e operacional do projeto foi desenhado em duas trilhas principais.

## Decisões de arquitetura

Uma decisão central foi hospedar a v1 em **VPS própria da OVH**, com **Docker Compose** e **Nginx** como reverse proxy. Isso aumenta o controle operacional sobre deploy, logs, proxy, TLS, observabilidade e persistência, além de reforçar o valor do projeto como evidência de engenharia real, e não apenas de construção visual.

Outra decisão importante foi separar a aplicação em blocos explícitos: `web-app` em Next.js para a interface pública, `portfolio-api-java` para o backend dinâmico, PostgreSQL para persistência operacional, Nginx para entrada pública e uma stack de observabilidade com Promtail, Loki, Prometheus e Grafana. Essa separação reduz acoplamento, melhora troubleshooting e permite que falhas no processamento do Learning in Public não derrubem o site principal.

Também foi relevante adotar **PostgreSQL desde a v1**, em vez de depender apenas de arquivos estáticos. Isso sustenta controle de status, ordenação, publicação, sincronização editorial e rastreabilidade dos eventos dinâmicos. Ao mesmo tempo, o conteúdo continua versionado em Markdown, preservando revisão por Git e edição simples. Essa combinação equilibra flexibilidade editorial com disciplina operacional.

Por fim, a funcionalidade **Learning in Public** foi desenhada com baixo acoplamento e escopo controlado: apenas PRs merged, poucos repositórios no início, persistência local, prevenção de duplicidade, revisão manual opcional e backend Java separado do app público. Isso evita transformar a Home em um feed social frágil e mantém a funcionalidade alinhada à ideia de evidência técnica séria.

## Indicadores que fazem sentido acompanhar

Os indicadores mais coerentes para acompanhar o sucesso desse projeto são:

* tempo de leitura necessário para entender a proposta principal na Home;
* taxa de navegação entre Home, Projetos e Contato;
* quantidade de projetos e conteúdos publicados com status consistente;
* volume de eventos do Learning in Public processados sem duplicidade;
* taxa de sucesso das sincronizações editoriais;
* taxa de sucesso das execuções do worker Java;
* disponibilidade da aplicação pública;
* taxa de erro e latência por rota;
* falhas de deploy e tempo de recuperação;
* consistência entre conteúdo versionado no repositório e conteúdo operacional no banco.

Esses indicadores fazem sentido porque medem tanto o objetivo editorial do portfólio quanto sua maturidade como sistema em produção.

## Resultado do case

O principal resultado deste case é transformar o portfólio em um ativo duplo: **canal público de posicionamento profissional** e **projeto real de engenharia**. Isso muda completamente o valor percebido da aplicação. Ela deixa de ser apenas uma página para apresentar projetos e passa a ser, ela mesma, uma demonstração prática de arquitetura, backend, banco, automação, CI/CD, observabilidade e operação.

Em termos de **produto**, o projeto cria uma experiência pública mais clara, editorialmente organizada e alinhada ao posicionamento profissional atual. Em termos de **engenharia**, demonstra separação de serviços, backend Java real, sincronização Markdown → banco, modelagem de dados, ingestão assíncrona, deploy automatizado e runbooks operacionais. Em termos de **portfólio**, cria coerência entre discurso e execução: o próprio site prova aquilo que ele comunica.

O case sustenta com honestidade benefícios claros: melhora da clareza de posicionamento, fortalecimento da prova técnica pública, criação de base arquitetural preparada para evolução incremental e aumento da aderência do portfólio ao tipo de maturidade valorizada em contextos corporativos.

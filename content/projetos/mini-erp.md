---
title: "Mini ERP de Compras"
description: "Mini ERP em Java/Spring Boot para compras, recebimento e estoque, com monólito modular, autenticação JWT e base DevOps-first."
slug: "mini-erp"
featured: true
order: 7
tags: ["Java", "Spring Boot", "Spring Security", "JWT", "Flyway"]
heroImage: "/images/projects/minierpbase.webp"
heroImageAlt: "Imagem base do Mini ERP com a estrutura inicial do projeto"
heroImageWidth: 1280
heroImageHeight: 853
---

# Mini ERP de Compras, Estoque e Recebimento

## Backend corporativo em Java para estruturar compras, recebimento e estoque com uma base segura, modular e preparada para operação

## Introdução

Fluxos de compras, recebimento e estoque costumam começar em planilhas, mensagens soltas e controles paralelos. No curto prazo, isso até parece suficiente. Com o aumento de volume, aprovações, fornecedores e itens em trânsito, o custo aparece: perda de rastreabilidade, dúvidas sobre saldo real, retrabalho no recebimento e dificuldade para auditar quem aprovou, o que entrou e o que ainda está pendente.

Este projeto foi concebido para atacar exatamente esse tipo de cenário. A proposta é construir um Mini ERP web voltado ao fluxo de compras, recebimento e controle de estoque, mas com uma decisão importante desde o início: antes de acelerar a camada transacional, consolidar uma fundação técnica que suporte segurança, evolução incremental, operação e deploy com menos improviso.

Por isso, o valor do case não está apenas no domínio escolhido. Está também na forma como a base foi estruturada: Java 17, Spring Boot, Spring Security, Flyway, testes de integração, health check, automação local por `make`, validações antecipadas no fluxo de desenvolvimento e documentação arquitetural com ADRs. Em vez de tratar backend corporativo como apenas CRUD, o projeto foi desenhado para mostrar disciplina de engenharia desde a fundação.

Repositório público: [mini-erp-compras](https://github.com/diegosantos-ai/mini-erp-compras)

## Problema de negócio

O problema central é a baixa governança operacional sobre um fluxo que envolve requisição, aprovação, pedido, recebimento e entrada em estoque. Quando esse processo depende de controles fragmentados, a empresa aumenta a chance de erro manual, atrasos na confirmação de recebimento, inconsistência de saldo, perda de contexto entre áreas e baixa auditabilidade das decisões.

Além disso, sistemas internos desse tipo não podem nascer apenas como interface. Eles precisam de autenticação confiável, papéis bem definidos, persistência versionada, tratamento coerente de erro e uma base que permita crescer sem virar um monólito acoplado e difícil de operar. Foi nesse ponto que o projeto foi posicionado: não como um ERP pronto, mas como a construção disciplinada de um backend corporativo pequeno, porém sério.

## Solução que entrega

A solução proposta é um Mini ERP com foco inicial em compras, recebimento e estoque, desenhado em estilo de **monólito modular** e com orientação **DevOps-first**. O fluxo-alvo do produto cobre requisição de compra, aprovação, pedido, recebimento, entrada em estoque, auditoria e consulta operacional.

No estágio atual, o projeto já entrega uma fundação funcional importante:

- módulo de identidade e acesso com `User`, `Role` e `RoleName`;
- autenticação stateless com JWT;
- endpoints `POST /api/auth/login` e `GET /api/auth/me`;
- endpoint operacional `GET /actuator/health`;
- persistência com Spring Data JPA;
- versionamento do banco com Flyway desde a primeira migration;
- bootstrap controlado de usuário administrador por configuração;
- configuração sensível externalizada por variáveis de ambiente;
- tratamento coerente de erros para credenciais inválidas, token ausente, token inválido e usuário inativo;
- testes automatizados cobrindo health, login, acesso protegido e cenários negativos;
- automação local padronizada com `Makefile`, incluindo comandos únicos para `lint`, `test`, `run` e `ci`;
- hooks de `pre-commit` e `pre-push` para antecipar problemas ainda no ambiente de desenvolvimento;
- varredura local contra segredos hardcoded antes de seguir no fluxo;
- pipeline inicial de CI para compilar e testar automaticamente.

Na prática, isso significa que a base mais sensível do sistema já nasce organizada: segurança, contrato HTTP mínimo, versionamento de dados, health check e validação automatizada. Os próximos módulos de negócio podem evoluir sobre uma fundação mais confiável, em vez de precisarem ser reescritos depois para corrigir lacunas estruturais.

Outro ponto relevante é que a automação não ficou restrita ao código. O projeto também começou a estruturar o fluxo de trabalho em torno dele, reduzindo improviso e aumentando rastreabilidade:

- backlog e governança operacional organizados no GitHub Projects;
- Definition of Done explícita para backend, documentação, frontend e infra;
- convenções de branch e regras de PR para disciplinar execução, revisão e merge.

## Como o projeto melhora a vida da empresa

O primeiro ganho está na **redução de risco arquitetural logo no início**. Em muitos projetos internos, a equipe começa modelando apenas telas e entidades de negócio, deixando segurança, health, migrations e organização do backend para depois. Isso acelera a primeira demo, mas cobra caro na manutenção. Aqui, a escolha foi o oposto: criar uma fundação que permita escalar os módulos de compras e estoque com menos dívida estrutural.

O segundo ganho está na **clareza de evolução**. Como o projeto já delimita módulos, camadas e ADRs, fica mais simples saber onde novos casos de uso devem entrar, como o sistema deve crescer e quais decisões arquiteturais já foram tomadas. Isso reduz improviso, facilita onboarding técnico e melhora a previsibilidade para quem continua a implementação.

O terceiro ganho está na **operabilidade mínima viável**. Mesmo antes de Docker, PostgreSQL e deploy em nuvem entrarem nas próximas etapas, a aplicação já possui health check, configuração externa, testes de integração, pipeline inicial e rotinas locais padronizadas. Isso cria uma base mais segura para build, troubleshooting e evolução do serviço.

Há também um ganho importante de **disciplina operacional do processo**. Quando `Makefile`, hooks locais, checagem de segredos, banco versionado, convenções de PR e board de execução entram cedo no projeto, a equipe reduz dependência de memória individual e transforma planejamento em fluxo rastreável. Isso ajuda a sustentar evolução com menos retrabalho, menos surpresa e mais clareza sobre o que está pronto, o que ainda está em progresso e como validar cada entrega.

## Decisões de arquitetura

Uma decisão central foi adotar **monólito modular** no backend em vez de microserviços prematuros. Para um sistema desse porte e estágio, a prioridade é manter separação de responsabilidades sem aumentar custo operacional desnecessário. O projeto explicita camadas como `api`, `application`, `domain` e `infrastructure`, o que ajuda a preservar clareza sem fragmentar demais a solução.

Outra escolha importante foi colocar **segurança e versionamento do banco desde a fundação**. A presença de Spring Security, JWT, Flyway e testes de integração na base do projeto mostra uma direção mais madura do que simplesmente adiar esses temas até o momento em que o sistema já está acoplado a regras de negócio.

Também merece destaque a abordagem **documentação + código**. O repositório não se apoia só no README: ele já possui visão de produto, requisitos, arquitetura, riscos e ADRs. Isso é relevante porque backend corporativo não depende apenas de implementação; depende também de decisões registradas, contexto compartilhado e governança de evolução.

Também vale notar a decisão de **automatizar não só a execução técnica, mas também o processo**. A combinação entre GitHub Projects, Definition of Done, convenções de branch, regras de PR, `pre-commit`, `pre-push`, secret scan e comandos únicos por `make` cria uma esteira inicial que antecipa falhas e reduz fricção no trabalho diário.

Por fim, a direção **DevOps-first** reforça o posicionamento técnico do case. Docker, Terraform, Ansible, OVHcloud, observabilidade e evolução para Kubernetes aparecem como roadmap explícito, conectando o backend Java a uma ambição operacional realista e progressiva.

## Indicadores que fazem sentido acompanhar

Os indicadores mais coerentes para acompanhar a evolução desse projeto são:

- taxa de sucesso do fluxo `login -> token -> /me`;
- incidência de `401` por token inválido, ausente ou usuário inativo;
- tempo de execução das migrations e sucesso de startup;
- taxa de sucesso das validações locais em `pre-commit` e `pre-push`;
- taxa de sucesso da pipeline de build e testes;
- latência e disponibilidade do endpoint de health;
- número de regressões capturadas pelos testes de integração;
- incidência de detecção precoce de segredos hardcoded nas varreduras locais;
- progresso dos módulos de negócio previstos no roadmap;
- fluidez do fluxo entre backlog, execução, revisão e conclusão no board;
- esforço necessário para evoluir novos casos de uso sem quebrar a base existente.

Esses indicadores fazem sentido porque medem não apenas features entregues, mas a qualidade da fundação que vai sustentar o restante do ERP.

## Resultado do case

O principal resultado deste case, até aqui, é a construção de uma fundação de backend em Java que já demonstra preocupações reais de engenharia: segurança, organização modular, migração versionada, health check, tratamento de erro, testes automatizados, automação local, checagem preventiva de segredos e documentação arquitetural. Isso é especialmente valioso porque aproxima o projeto do tipo de disciplina esperado em sistemas corporativos, mesmo antes da entrada dos módulos completos de compras, recebimento e estoque.

Não seria honesto dizer que o ERP já está pronto. O valor do projeto, neste estágio, está em mostrar que a evolução funcional está sendo construída sobre uma base sólida, e não sobre improviso. Como prova de portfólio, isso é relevante porque demonstra capacidade de estruturar um backend Java/Spring Boot com intenção arquitetural, visão operacional, automação de processo e espaço real para crescer.

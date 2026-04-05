---
title: "Nexo 360"
description: "Plataforma multi-agente desenhada para resolver demandas reais de PMEs, com arquitetura modular, multi-tenant e foco em evolução segura."
slug: "nexo360"
featured: true
order: 1
tags: ["Python", "FastAPI", "Hexagonal", "IA", "Grafana","RAG","LLM"]
---

# Nexo 360

## Plataforma multiagente de IA para ampliar o acesso à inteligência de negócio em PMEs, atuando como camada complementar de análise, orientação e interação sobre a operação da empresa

Pequenas e médias empresas frequentemente precisam tomar decisões em áreas como finanças, mercado, projetos, pessoas e atendimento sem contar com estrutura suficiente para contratar consultorias especializadas ou manter equipes analíticas dedicadas para cada frente do negócio. Em muitos casos, os dados até existem, mas nem sempre chegam ao gestor de forma simples, contextual e acionável no ritmo da operação.

O Nexo 360 foi concebido para atuar nesse espaço como uma camada complementar de inteligência de negócio. A proposta não é substituir sistemas de gestão já consolidados, nem assumir o papel de plataformas transacionais especializadas, mas facilitar o acesso do gestor a análises, recomendações e interações orientadas por contexto, usando canais já presentes na rotina, como WhatsApp e interface web.

## Problema de negócio

O problema central não é apenas ausência de informação, mas dificuldade de transformar dados, contexto e rotina operacional em orientação prática para decisão. Empresas de menor porte costumam operar com recursos limitados, pouco tempo para análise e baixa integração entre frentes como comercial, financeiro, projetos, RH e atendimento. Isso reduz velocidade de resposta, aumenta dispersão de contexto e dificulta uma visão mais integrada do negócio.

Além disso, mesmo quando a empresa já utiliza sistemas estruturados de gestão, ainda existe uma lacuna entre registrar a operação e gerar inteligência acessível no momento da decisão. Foi justamente nessa camada de apoio, interpretação e acompanhamento que o projeto foi posicionado.

## Solução que entrega

A solução proposta foi uma plataforma multiagente de IA orientada a domínios de negócio. O Nexo 360 reúne cinco agentes especializados — Growth, Finance, Insights, Talent e Conect — além de um orquestrador premium responsável por consolidar visão integrada, priorização de contexto e experiência unificada para o gestor. Cada agente cobre um recorte específico, enquanto o Nexo 360 atua como camada superior de coordenação e síntese.

Na prática, a plataforma:

* conversa com o gestor via WhatsApp e interface web usando o mesmo pipeline de IA;
* aprende o contexto do negócio durante o onboarding;
* mantém memória persistente entre sessões;
* envia mensagem automática de bom dia às 08:00 com resumo personalizado por agente;
* respeita hierarquia de acesso por perfil;
* isola completamente os dados por tenant em uma arquitetura multi-tenant.

Do ponto de vista técnico, o projeto foi estruturado em Python 3.11+, FastAPI e arquitetura hexagonal, com separação clara entre domínio, portas e adaptadores. A base também contempla persistência via migrations SQL idempotentes, testes, documentação operacional e dependências externas containerizadas, como PostgreSQL, Redis e ChromaDB.

## Como o projeto melhora a vida da empresa

O primeiro ganho está na **acessibilidade da inteligência de negócio**. O Nexo 360 reduz a distância entre dado operacional e decisão prática, entregando leituras, alertas e orientações em canais mais naturais para o gestor. Isso ajuda a tornar o consumo de informação menos dependente de navegação técnica ou interpretação isolada de múltiplas telas e relatórios.

O segundo ganho está na **especialização por domínio com experiência unificada**. Em vez de tratar temas de finanças, mercado, projetos, RH e atendimento como blocos desconectados, a plataforma organiza esses contextos em agentes especializados, mas preserva uma camada integrada de visão executiva por meio do Nexo 360. Isso cria uma experiência complementar mais fluida sobre a operação da empresa.

O terceiro ganho está em **continuidade e personalização**. Como a plataforma acumula memória persistente entre sessões e aprende o contexto do negócio no onboarding, as interações deixam de ser genéricas. Isso tende a aumentar a relevância das respostas e a qualidade do acompanhamento ao longo do tempo.

Há também um benefício estrutural de **escala com isolamento**. A plataforma foi desenhada para atender múltiplos clientes com segregação completa por tenant e controle hierárquico de acesso. Isso cria uma base mais segura para crescimento, preservando contexto, privacidade e governança entre empresas distintas.

## Fluxo da solução

![Fluxo operacional do Stack de Observabilidade](/images/projects/nexo360-flow-v1.png)

 Em todo o fluxo, a hierarquia de acesso define o que cada perfil pode visualizar, enquanto o modelo multi-tenant preserva o isolamento entre clientes.

## Decisões de arquitetura

Uma decisão central foi estruturar o projeto com **arquitetura hexagonal**. Isso ajuda a separar regras de domínio das integrações externas, reduz acoplamento e facilita evolução incremental do produto. Em um sistema que combina IA, múltiplos agentes, persistência e canais conversacionais, essa separação é importante para manter clareza e testabilidade.

Outra escolha crítica foi adotar **multi-tenancy com isolamento total** desde a base do sistema. Isso demonstra preocupação com segurança, segregação de contexto e capacidade de crescimento sem mistura de dados entre clientes, algo essencial para qualquer solução B2B que lide com informação operacional.

Também foi importante manter **canais diferentes sobre o mesmo pipeline de IA**. Em vez de criar experiências isoladas para WhatsApp e web, a plataforma foi desenhada para compartilhar lógica e contexto, reduzindo duplicidade e melhorando consistência da experiência.

Por fim, a adoção de **migrations SQL idempotentes**, autenticação por chave de tenant, proteção de endpoints internos e separação entre domínio, adaptadores e integrações mostra preocupação com disciplina operacional, segurança e manutenção do sistema ao longo do tempo.

## Indicadores que fazem sentido acompanhar

Os indicadores mais coerentes para acompanhar o sucesso do Nexo 360 são:

* taxa de ativação de tenants após onboarding;
* frequência de uso por canal, como WhatsApp e web;
* retenção de uso por agente e por tenant;
* tempo médio de resposta das interações;
* taxa de consultas resolvidas sem escalonamento manual;
* engajamento com as mensagens proativas de bom dia;
* quantidade de insights ou recomendações acionáveis geradas por domínio;
* incidência de falhas de isolamento ou inconsistência de contexto entre tenants;
* adoção do orquestrador 360 em relação aos agentes isolados;
* nível de uso por perfil de acesso dentro de cada empresa.

Esses indicadores ajudam a medir uso, aderência e valor percebido da plataforma como camada complementar de inteligência e acompanhamento.

## Resultado do case

O principal resultado deste case é a construção de uma base de produto que posiciona IA aplicada como camada complementar de inteligência de negócio para PMEs. Em vez de disputar o espaço de sistemas transacionais ou plataformas de gestão consolidadas, o Nexo 360 foi desenhado para ampliar a capacidade de leitura, acompanhamento e interação sobre a operação, com agentes especializados por domínio e uma camada de orquestração integrada.

Em termos de **valor de negócio**, o projeto cria uma forma mais acessível de aproximar análise e orientação da rotina do gestor. Em termos de **arquitetura**, demonstra preocupação com separação de responsabilidades, segurança, controle de acesso e escala por tenant. Em termos de **produto**, mostra uma visão coerente de experiência integrada entre agentes especializados e um orquestrador central.

---
title: "AWS Infrastructure (IaC)"
description: "Infraestrutura web em AWS provisionada com Terraform, com foco em modularidade, repetibilidade e controle operacional."
slug: "iac"
featured: true
order: 3
tags: ["Terraform", "AWS", "IaC", "GitHub Actions"]
---

# AWS Infrastructure with Terraform

# AWS Infrastructure (IaC)

## Provisionamento declarativo de infraestrutura na AWS para publicar serviços com mais previsibilidade, rastreabilidade e controle operacional

## Introdução

Quando uma equipe precisa colocar um serviço web no ar com velocidade, o caminho mais comum ainda é o console da cloud: criar rede, abrir portas, subir instância e ajustar regras manualmente. Esse processo até resolve o problema imediato, mas cria outro maior logo depois: baixa rastreabilidade, dificuldade de revisão, dependência de memória operacional e risco de divergência entre o que foi pensado e o que realmente ficou configurado.

Este projeto foi construído para demonstrar uma alternativa mais madura. Em vez de depender de criação manual no painel da AWS, toda a infraestrutura foi modelada com Terraform, versionada em Git e validada por pipeline. O foco não era apenas subir recursos em nuvem, mas mostrar capacidade de tratar infraestrutura como software: com organização modular, revisão de mudanças, backend remoto de state e deploy controlado.

## Problema de negócio

O problema central aqui não é simplesmente “criar uma EC2”. O problema é como publicar um serviço de forma repetível, segura e governável. Em ambientes sem Infraestrutura como Código, recursos são criados por clique, ajustes ficam pouco documentados e a operação passa a depender de quem “lembra como foi feito”. Isso reduz previsibilidade, dificulta troubleshooting e complica qualquer tentativa de escalar ou reaplicar o ambiente em outro contexto.

Nesse cenário, a necessidade era simular uma situação comum de engenharia: publicar rapidamente um serviço web institucional simples na AWS, mas fazer isso com padrões que suportassem manutenção, refatoração, validação e evolução. Ou seja, não bastava ter infraestrutura funcionando; era necessário ter infraestrutura gerenciável.

## Solução que entrega

A solução foi estruturar uma infraestrutura básica na AWS inteiramente com Terraform, cobrindo rede, segurança, computação, state remoto e automação de validação e deploy. O projeto provisiona uma VPC customizada, subnet pública, Internet Gateway, route table pública, regras de firewall e uma instância EC2 com IP público, além de `user_data` para publicação automática de um serviço web simples.

Além do provisionamento em si, a solução foi evoluída para uma arquitetura modular. O root module ficou responsável pela orquestração, enquanto rede, segurança e computação foram isoladas em módulos próprios. O projeto também passou a usar backend remoto em S3 para state do Terraform e pipelines no GitHub Actions para executar `fmt`, `validate`, `plan` e `apply` de forma controlada.

Na prática, isso entrega mais do que uma infra simples na AWS. Entrega um fluxo de engenharia que permite criar, revisar, reaplicar e evoluir a infraestrutura com mais confiança, sem depender do console como fonte primária de operação.

## Como o projeto melhora a vida da empresa

O primeiro ganho está na **reprodutibilidade**. Com a infraestrutura descrita em código, a empresa deixa de depender de execução manual para reconstruir o ambiente. Isso facilita reaplicação, auditoria de mudanças e recuperação de contexto, além de reduzir o risco de configurações divergentes entre diferentes execuções. O uso de variáveis, outputs, módulos e backend remoto reforça esse caráter repetível e mais seguro da operação.

O segundo ganho está na **produtividade operacional**. Em vez de recriar VPC, subnet, Internet Gateway, regras de acesso e instância manualmente, a infraestrutura pode ser inicializada e alterada por fluxo padronizado com `terraform init`, `fmt`, `validate`, `plan` e `apply`. Isso reduz tempo gasto com configuração manual, aumenta clareza sobre o que vai mudar antes da execução e melhora a disciplina operacional da equipe.

O terceiro ganho está na **governança da mudança**. O projeto separa validação automática de deploy real, mantendo o `terraform apply` sob gatilho manual e restrito à branch principal. Essa decisão reduz risco operacional e mostra preocupação com controle de alteração em ambiente real, o que é importante em qualquer contexto onde cloud já não pode ser tratada como laboratório improvisado.

Por fim, há um ganho claro de **escalabilidade arquitetural**. Embora o escopo atual seja uma infraestrutura simples, a base foi organizada para suportar crescimento: módulos reaproveitáveis, state remoto, possibilidade de ambientes separados e evolução futura do pipeline com aprovação por ambiente ou autenticação via OIDC. Isso transforma um laboratório em uma fundação plausível para cenários mais próximos do mundo corporativo.

## Fluxo da solução

![Fluxo operacional do AWS Infrasctruture (IaC)](/images/projects/awsiac-flow-v1.png)

O fluxo da solução foi desenhado para seguir uma lógica de engenharia e não apenas de execução técnica.

## Decisões de arquitetura

A principal decisão arquitetural foi sair de uma estrutura flat e evoluir para modularização por domínio funcional. Em vez de manter tudo concentrado no root module, o projeto passou a separar rede, segurança e computação em módulos específicos. Isso reduz acoplamento, melhora leitura, facilita troubleshooting e prepara o código para reuso e expansão.

Outra decisão relevante foi o uso de **backend remoto em S3** para state. Isso aumenta rastreabilidade, reduz fragilidade operacional do state local e aproxima o projeto de um padrão mais realista de colaboração e governança. O state deixa de ser um detalhe escondido na máquina do operador e passa a ser tratado como parte crítica da operação da infraestrutura.

Também foi importante manter a separação entre **CI automático e CD controlado**. O CI verifica estrutura e impacto da mudança; o CD executa o deploy real apenas por gatilho manual. Essa escolha mostra preocupação com segurança operacional e com a diferença entre validar código e alterar ambiente produtivo, mesmo em um laboratório.

Por fim, a refatoração foi feita com blocos `moved`, preservando state e evitando destruição e recriação desnecessária dos recursos. Isso é uma decisão madura porque mostra que modularizar não significa quebrar a infraestrutura existente; significa reorganizar com segurança.

## Indicadores que fazem sentido acompanhar

Os indicadores mais úteis para acompanhar o sucesso dessa solução são:

* tempo para provisionar o ambiente do zero;
* taxa de sucesso dos workflows de CI e CD;
* quantidade de mudanças identificadas no `terraform plan` antes do `apply`;
* número de ajustes manuais necessários fora do Terraform;
* tempo para reproduzir a infraestrutura em outra execução;
* incidência de erros por configuração incorreta de rede ou segurança;
* convergência entre state, código e recursos reais na AWS;
* tempo de resposta para validação funcional do serviço web após o deploy.

Esses indicadores fazem sentido porque medem não só se a infraestrutura “subiu”, mas se ela está sendo operada com previsibilidade, controle e repetibilidade.

## Resultado do case

O resultado final do case foi a entrega de uma infraestrutura funcional na AWS, com VPC, subnet pública, Internet Gateway, route table, security group e instância EC2 com serviço web publicado, além de backend remoto para state e pipelines de CI/CD funcionando no GitHub Actions.

Mais importante do que os recursos criados foi o padrão de engenharia demonstrado. O projeto provou capacidade de transformar um cenário simples de hospedagem em uma solução declarativa, modular, validável e automatizada. Isso gera valor direto em **reprodutibilidade**, porque a infraestrutura deixa de depender do console e passa a ser recriável por código; em **produtividade**, porque mudanças seguem um fluxo padronizado e revisável; e em **escalabilidade**, porque a base já foi preparada para módulos reaproveitáveis, backend remoto e evolução futura para múltiplos ambientes e controles mais avançados de deploy.

O projeto também demonstrou convergência real entre código e ambiente provisionado. Na execução final do workflow de CD, o `terraform apply` retornou “0 added, 0 changed, 0 destroyed”, confirmando integridade do backend remoto, credenciais corretas e alinhamento entre o que estava versionado e o que existia na AWS. Isso é um sinal importante de maturidade porque mostra que a automação não apenas executa, mas mantém coerência do ambiente ao longo do tempo.

Não há métricas quantitativas de economia de tempo ou custo no material disponível, então não é adequado afirmar ganhos numéricos. Ainda assim, o case sustenta com honestidade benefícios claros: menos dependência de criação manual, mais controle sobre mudanças, melhor capacidade de reaplicação e uma base mais sólida para operar infraestrutura em nuvem com método.

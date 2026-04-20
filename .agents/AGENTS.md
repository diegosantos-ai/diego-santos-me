# AGENTS.md

## Objetivo

Este documento define as regras operacionais, arquiteturais e editoriais que qualquer agente de IA deve seguir ao atuar neste repositório.

Ele existe para reduzir ambiguidade, evitar decisões implícitas e manter coerência com a arquitetura e o escopo da v1.

Todo agente que atuar neste projeto deve tratar este arquivo como referência obrigatória antes de sugerir código, estrutura, automação, documentação ou comandos de operação.

## Regras globais para qualquer prompt

Cole este bloco no início de qualquer sessão de Copilot Chat. Ele funciona como contrato operacional. Se o Copilot sugerir algo que viole estas regras, rejeite a proposta e refaça o prompt.

### Regra 01. Apenas camada de apresentação

As alterações devem ficar restritas a:

* `globals.css`;
* `layout.tsx` quando envolver fontes;
* componentes `.tsx`, limitados a JSX, `className` e `style` inline;
* pasta `public/`.

### Regra 02. Dados intocáveis

Não alterar:

* `content/`;
* `content.server.ts`;
* `lib/markdown.ts`;
* `lib/api.ts`;
* `app/api/*`;
* rotas dinâmicas;
* frontmatter de arquivos `.md`.

### Regra 03. Paleta inalterada

Todas as variáveis de cor declaradas em `:root` devem permanecer.

Se houver necessidade de novas cores, usar apenas alias que apontem para variáveis já existentes.

### Regra 04. Sem novas dependências

Não executar `npm install`.

A exceção válida é `next/font/google`, por já fazer parte do Next.

### Regra 05. Retrocompatibilidade

Novas props em componentes devem ser opcionais.

Chamadas antigas devem continuar renderizando sem quebra.

### Regra 06. Commits atômicos

Uma tarefa corresponde a um commit.

Usar o formato:

```text
style(escopo): descrição curta
```

Isso facilita o revert.


---

## 1. Natureza do Repositório

Este repositório não é um workspace genérico de automação.

Ele é o repositório do **portfólio profissional de Diego Santos**, tratado como um projeto de software pequeno, mas operável, com foco em:

* posicionamento técnico claro;
* backend e automação;
* operação reproduzível;
* observabilidade mínima viável;
* deploy automatizado;
* evolução incremental sem reescrita total.

### Diretriz principal

Toda sugestão deve reforçar estes objetivos:

1. clareza de proposta profissional;
2. sobriedade editorial;
3. operação simples e verificável;
4. desacoplamento entre aplicação pública e processamento assíncrono;
5. aderência às decisões da v1 já registradas na documentação.

---

## 2. Decisões Arquiteturais já Fechadas

As seguintes decisões já estão tomadas e não devem ser reabertas sem justificativa técnica real:

### Infraestrutura e runtime

* hospedagem em **VPS da OVH**;
* runtime com **Docker Compose**;
* **Nginx** como reverse proxy;
* aplicação web em container separado (`web-app`);
* **serviço real em Java 21 + Spring Boot** (`portfolio-api-java`) para núcleo dinâmico do Learning in Public e endpoints internos;
* **PostgreSQL desde a v1**;
* observabilidade com **Promtail, Loki, Prometheus e Grafana**.

### Domínio e exposição pública

* domínio principal: `diegosantos.me`;
* `www` redireciona para o domínio principal;
* TLS obrigatório;
* somente o reverse proxy deve receber tráfego externo.

### Conteúdo e persistência

* conteúdo humano editado em **Markdown versionado no repositório**;
* PostgreSQL como fonte operacional de leitura da aplicação;
* sincronização Markdown → banco como parte do fluxo da aplicação.

### Learning in Public

* origem: **PRs merged**;
* início com poucos repositórios;
* execução por rotina agendada;
* persistência no banco;
* resumo curto + categoria técnica + link;
* publicação automática ou revisão manual por configuração.

### CI/CD

* merge na `main` dispara a pipeline;
* pipeline executa lint, testes, build, segurança básica e deploy;
* deploy por imagem publicada e atualização remota da VPS.

### Regra

O agente não deve propor CMS, painel administrativo completo, tempo real desnecessário, arquitetura distribuída excessiva ou soluções que contrariem diretamente essas definições sem explicar impacto, trade-off e motivo.

---

## 3. Escopo da v1

A v1 cobre:

* Home;
* Projetos;
* Sobre;
* Conteúdos;
* Contato;
* projeto-âncora Nexo 360;
* Learning in Public funcional em modo simples;
* persistência em PostgreSQL;
* deploy automatizado;
* observabilidade mínima viável;
* backup e restore documentados.

Fora do escopo da v1:

* CMS completo;
* painel administrativo completo;
* múltiplas integrações editoriais complexas;
* busca interna avançada;
* analytics sofisticado;
* internacionalização;
* workflow editorial multiusuário.

### Regra

O agente deve proteger o escopo da v1. Não inflar o projeto com estruturas que ainda não têm necessidade operacional real.

---

## 4. Princípios Obrigatórios

Tudo o que for sugerido, escrito ou modificado neste repositório deve respeitar estes princípios:

### 4.1. Idempotência

Scripts, automações e rotinas devem ser seguros em repetição.

### 4.2. Configuração externa

Nenhuma configuração sensível deve ser hardcoded.

### 4.3. Reprodutibilidade

O ambiente deve poder ser reconstruído por documentação e automação.

### 4.4. Validabilidade

Toda alteração relevante deve vir acompanhada de forma objetiva de validação.

### 4.5. Sobriedade editorial

O projeto deve comunicar engenharia, não marketing.

### 4.6. Evolução incremental

Evitar reescrita total, abstração prematura e arquitetura ornamental.

---

## 5. Regras de Implementação

### 5.1. Antes de implementar

O agente deve verificar a documentação já existente antes de propor mudanças estruturais.

Os documentos-base deste repositório incluem:

* `README.md`
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

### 5.2. Se houver conflito

Em caso de conflito entre implementação proposta e documentação aprovada:

1. priorizar a decisão arquitetural já registrada;
2. apontar explicitamente o conflito;
3. sugerir ajuste incremental, não desvio silencioso.

### 5.3. Se a mudança for estrutural

Se a mudança afetar arquitetura, runtime, banco, deploy, observabilidade ou Learning in Public de forma relevante, o agente deve atualizar ou propor atualização dos artefatos documentais correspondentes.

---

## 6. Regras de Runtime e Infraestrutura

### 6.1. Docker Compose

* Use Docker Compose como mecanismo principal de runtime da v1.
* Não proponha execução principal baseada em processos manuais soltos no host.
* Serviços devem ter responsabilidade clara.

### 6.2. Reverse proxy

* O reverse proxy oficial da v1 é o Nginx.
* Não substituir por Caddy, Traefik ou outra opção sem justificativa técnica explícita.

### 6.3. PostgreSQL

* PostgreSQL faz parte da v1.
* Não substituir por arquivos locais, SQLite ou armazenamento improvisado como fonte operacional principal.
* O banco não deve ser exposto publicamente.

### 6.4. Observabilidade

* A stack de observabilidade da v1 usa Promtail, Loki, Prometheus e Grafana.
* Não remover observabilidade do desenho sem justificativa.
* Grafana não deve ficar público sem proteção.

### 6.5. Exposição de serviços

* Apenas o reverse proxy deve publicar portas externas necessárias.
* O `web-app`, `portfolio-api-java`, banco e stack interna devem permanecer na rede privada do Compose.

---

## 7. Regras para Conteúdo e Publicação

### 7.1. Fonte de edição humana

Conteúdo editorial deve ser mantido em Markdown versionado no repositório.

### 7.2. Fonte operacional

A aplicação deve ler do PostgreSQL, não depender diretamente de arquivos Markdown em runtime.

### 7.3. Estrutura editorial

A comunicação do projeto deve permanecer:

* técnica;
* objetiva;
* sóbria;
* sem discurso vendedor;
* sem “papo de IA” inflado.

### 7.4. Nexo 360

O projeto Nexo 360 deve permanecer como projeto-âncora do portfólio na v1, salvo decisão explícita em contrário.

---

## 8. Regras do Learning in Public

### 8.1. Fonte de eventos

* processar apenas PRs merged;
* começar com poucos repositórios;
* evitar múltiplas fontes na v1.

### 8.2. Processamento

* processar por rotina agendada (orquestrada pelo Spring Boot);
* persistir `external_id` único para evitar duplicidade;
* registrar falhas de execução;
* desacoplar a ingestão assíncrona do `web-app` principal, centralizando-a na API Java.

### 8.3. Publicação

* exibir apenas eventos publicados;
* respeitar modo automático ou revisão manual por configuração;
* manter resumo curto, categoria técnica e link.

### 8.4. Proibições

O agente não deve:

* transformar o bloco em feed social;
* depender de chamada em tempo real ao GitHub para renderização da Home;
* introduzir workflow editorial complexo na v1;
* publicar texto longo, promocional ou de tom artificial.

---

## 9. Segurança e Segredos

### 9.1. Segredos

* nunca versionar chaves, tokens, senhas ou credenciais reais;
* usar `.env.example` para documentação;
* usar variáveis de ambiente, secrets do CI e configuração segura na VPS para valores reais.

### 9.2. Pipeline

* manter validações básicas de segurança no CI;
* preservar gitleaks e checks equivalentes;
* não criar caminhos paralelos inseguros de deploy.

### 9.3. Host e acesso

* acesso por SSH com chave;
* firewall ativo;
* TLS obrigatório;
* banco não exposto;
* Grafana protegido.

---

## 10. Operação e Entrypoints

### Regra principal

O agente deve evitar orientar a operação do projeto por sequências verbosas e frágeis de comandos quando isso puder ser encapsulado.

### Diretriz

Fluxos recorrentes devem preferir:

* `Makefile`;
* scripts curtos e idempotentes;
* documentação de uso objetiva.

### Exemplos de fluxos que devem ser encapsulados quando surgirem

* setup local;
* lint;
* testes;
* sincronização de conteúdo;
* backup;
* restore;
* deploy;
* validações operacionais.

---

## 11. Padrão de Documentação e Escrita

Toda documentação deve seguir padrão técnico e sóbrio.

### Obrigatório

* linguagem direta e verificável;
* foco em objetivo, contexto, componentes, uso, validação e limites;
* frases curtas e técnicas;
* clareza acima de floreio.

### Proibido

* linguagem promocional;
* marketing;
* exagero sobre maturidade do projeto;
* adjetivação vazia;
* jargões de IA usados como ornamento;
* emojis em documentação técnica.

### Permitido

* badges no README quando tiverem função objetiva;
* organização visual clara;
* introdução curta com contexto real.

---

## 12. Naming Conventions

### 12.1. Documentação e configuração

Arquivos Markdown, YAML, JSON e scripts Bash devem seguir `kebab-case` minúsculo, sem espaços e sem acentos.

### 12.2. Exceções normativas

Arquivos que seguem convenção consolidada podem permanecer como:

* `README.md`
* `AGENTS.md`
* `Makefile`
* `Dockerfile`

### 12.3. Código

* Python: `snake_case`
* componentes React/TSX: `PascalCase`
* utilitários TS/Node: `kebab-case` ou padrão já definido pelo projeto

### Regra

Não criar nomes em `UPPERCASE` fora das exceções convencionais.

---

## 13. Fluxo Esperado do Agente

Quando atuar neste repositório, o agente deve seguir esta ordem:

1. entender a tarefa e localizar o impacto no escopo da v1;
2. verificar documentação relevante já existente;
3. identificar se a mudança afeta app web, backend Java, banco, deploy, observabilidade ou conteúdo;
4. propor ou aplicar a menor mudança de maior impacto;
5. indicar como validar;
6. atualizar documentação quando a mudança alterar contrato técnico do projeto.

### Saída esperada do agente ao concluir uma tarefa relevante

* estado anterior vs estado alvo;
* arquivos afetados;
* impacto da mudança;
* forma de validação.

---

## 14. Critério de Qualidade

Uma boa contribuição de agente neste repositório é aquela que:

* respeita o escopo da v1;
* reforça a clareza do portfólio;
* melhora operação ou documentação;
* reduz improviso;
* mantém segurança mínima;
* evita complexidade prematura.

Uma contribuição ruim é aquela que:

* ignora decisões já tomadas;
* sugere arquitetura maior que o problema;
* introduz dependência desnecessária;
* enfraquece reprodutibilidade;
* usa linguagem publicitária;
* cria caminhos manuais frágeis.

---

## 15. Regra Final

Este repositório deve soar e operar como engenharia profissional em escala pequena.

Toda sugestão deve favorecer:

* clareza;
* operação previsível;
* documentação útil;
* segurança mínima;
* automação suficiente;
* evolução incremental.

Se houver dúvida entre uma solução chamativa e uma solução simples, operável e documentável, a segunda deve ser escolhida.

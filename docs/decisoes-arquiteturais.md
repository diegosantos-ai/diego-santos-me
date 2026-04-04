# Decisões Arquiteturais — Portfólio Profissional Diego Santos

## Objetivo

Registrar as decisões arquiteturais iniciais do projeto de reconstrução do portfólio profissional, definindo a base técnica, operacional e de infraestrutura da v1.

Este documento existe para reduzir ambiguidade, alinhar implementação e evitar decisões implícitas durante o desenvolvimento.

---

## 1. Hospedagem

### Decisão

* O projeto será hospedado em uma **VPS da OVH**.

### Motivo

* Maior controle operacional sobre ambiente, serviços, reverse proxy e observabilidade.
* Melhor aderência ao objetivo do projeto como evidência técnica de engenharia, automação e operação.
* Permite estruturar deploy, logs, métricas, banco e serviços auxiliares sob a mesma estratégia operacional.

### Consequência

* A equipe do projeto assume responsabilidade direta por deploy, proxy reverso, TLS, observabilidade, backup e hardening básico do host.

---

## 2. Modelo de Deploy

### Decisão

* O runtime da aplicação será baseado em **Docker Compose**.
* A aplicação principal rodará em **container separado**.
* O ambiente será atualizado por pipeline automatizada.

### Motivo

* Reprodutibilidade entre ambiente local e servidor.
* Facilidade de rollback e versionamento de imagens.
* Menor acoplamento ao host.
* Melhor aderência a práticas de operação e portfólio técnico.

### Consequência

* Os serviços da aplicação, banco e observabilidade devem ser descritos de forma explícita no `docker-compose.yml`.
* Healthchecks, volumes e variáveis de ambiente passam a ser parte obrigatória do desenho operacional.

---

## 3. Reverse Proxy

### Decisão

* O reverse proxy escolhido para a v1 é o **Nginx**.

### Motivo

* Maior controle fino sobre configuração.
* Maior familiaridade de mercado.
* Melhor valor de repertório técnico para contexto profissional.
* Permite consolidar TLS, redirecionamentos, headers de segurança e roteamento de serviços.

### Consequência

* O Nginx será responsável por:

  * encerramento TLS;
  * redirecionamento de `www` para domínio principal;
  * headers de segurança;
  * proxy reverso para a aplicação principal;
  * eventual proteção de acesso a serviços internos como Grafana.

---

## 4. Estratégia de Domínio e HTTPS

### Decisão

* O domínio principal será **`diegosantos.me`**.
* O subdomínio `www` será redirecionado para o domínio principal.
* O HTTPS será obrigatório.
* O TLS será gerenciado pelo reverse proxy.

### Motivo

* Padronização do acesso público.
* Melhor consistência de branding técnico.
* Segurança mínima obrigatória para exposição pública da aplicação.

### Consequência

* O projeto deve prever:

  * configuração DNS consistente;
  * renovação automática de certificados;
  * redirecionamento HTTP → HTTPS;
  * redirecionamento `www` → domínio canônico.

---

## 5. Banco de Dados

### Decisão

* O projeto utilizará **PostgreSQL desde a v1**.

### O banco será utilizado para

* projetos;
* conteúdos publicados;
* metadados editoriais;
* eventos processados do Learning in Public;
* status de revisão/publicação;
* histórico mínimo de sincronização.

### Motivo

* Dar flexibilidade à evolução do portfólio sem depender apenas de arquivos estáticos.
* Permitir persistência operacional dos eventos dinâmicos.
* Melhorar consulta, indexação e organização de conteúdo.
* Separar edição humana de leitura operacional.

### Consequência

* O projeto passa a exigir:

  * modelagem inicial de entidades;
  * migrations;
  * estratégia de backup;
  * restore documentado;
  * volume persistente no ambiente Docker.

---

## 6. Fonte de Verdade do Conteúdo

### Decisão

* O conteúdo será editado em **Markdown versionado no repositório**.
* O conteúdo será sincronizado para o banco de dados durante o deploy ou por processo interno controlado.

### Motivo

* Facilidade de edição.
* Versionamento por Git.
* Revisão por pull request.
* Rastreabilidade editorial.
* Menor dependência de CMS na v1.

### Regra prática

* **Markdown no repositório** = fonte de edição humana.
* **PostgreSQL** = fonte operacional de leitura, consulta, publicação e indexação.

### Consequência

* Será necessário um fluxo de ingestão do conteúdo versionado para o banco.
* O app não deve depender exclusivamente de arquivos Markdown brutos em runtime.

---

## 7. Learning in Public

### Decisão

A funcionalidade Learning in Public seguirá as seguintes regras iniciais:

* ler apenas **pull requests merged**;
* começar com **um ou poucos repositórios**;
* atualizar por **cron job**;
* gerar **resumo curto + categoria técnica + link**;
* manter **filtro/manual review opcional**.

### Motivo

* Reduzir ruído e complexidade na v1.
* Focar em eventos técnicos já consolidados.
* Evitar dependência de tempo real sem necessidade.
* Criar evidência pública baseada em execução real.

### Diretriz operacional

* O processamento deve registrar quais PRs já foram tratados.
* O sistema deve evitar reprocessamento duplicado.
* O texto enviado à LLM deve ser sanitizado e limitado ao necessário.
* O modo de publicação automática deve ser controlado por configuração.

### Consequência

* O projeto precisará de um worker ou processo agendado separado da aplicação principal.
* O fluxo do Learning in Public deve ter rastreamento de status, falha e publicação.

---

## 8. Separação de Serviços

### Decisão

A arquitetura de runtime da v1 será separada nos seguintes blocos:

* aplicação principal;
* banco PostgreSQL;
* reverse proxy;
* worker do Learning in Public;
* stack de observabilidade.

### Motivo

* Reduzir acoplamento entre renderização pública e processamento assíncrono.
* Facilitar troubleshooting.
* Melhorar manutenção e evolução incremental.

### Consequência

* O Learning in Public não deve ficar embutido de forma frágil no processo principal da aplicação.
* O worker deve poder falhar ou reiniciar sem derrubar a aplicação web.

---

## 9. Pipeline de CI/CD

### Decisão

* **Merge na `main`** dispara a pipeline.
* A pipeline executará:

  * lint;
  * testes;
  * build;
  * validação básica de segurança;
  * deploy.
* O deploy seguirá estratégia baseada em imagem publicada e atualização remota da VPS.

### Motivo

* Garantir esteira objetiva e reproduzível.
* Reduzir drift entre ambiente de build e de produção.
* Melhorar rollback e versionamento de entrega.

### Diretriz recomendada

* A pipeline deve buildar a imagem.
* A imagem deve ser publicada em registry.
* A VPS deve executar atualização por `docker compose pull` e `docker compose up -d`.

### Consequência

* O servidor não deve ser usado como ambiente primário de build manual.
* O processo de deploy deve ser encapsulado e documentado.

---

## 10. Observabilidade

### Decisão

A v1 terá observabilidade mínima viável com a seguinte stack:

* **Promtail + Loki** para logs;
* **Prometheus + Grafana** para métricas e dashboards.

### Motivo

* Tornar a aplicação operável por evidência.
* Criar base real de troubleshooting.
* Aumentar valor técnico do projeto como case público.

### Escopo inicial

* dashboards simples;
* alertas mínimos;
* logs estruturados;
* métricas básicas da aplicação e do worker.

### Métricas mínimas esperadas

* disponibilidade da aplicação;
* taxa de erro;
* latência por rota;
* execução do worker;
* falhas de sincronização;
* volume de eventos processados.

### Consequência

* A observabilidade deve ser desenhada como parte da arquitetura, não como adição posterior.
* O Grafana não deve ficar exposto publicamente sem proteção.

---

## 11. Estratégia de Segurança

### Decisão

A v1 seguirá estratégia de segurança compatível com Shift-Left Security e operação mínima segura.

### Regras definidas

* nenhum secret será versionado no repositório;
* uso de `.env.example` para documentação de configuração;
* secrets reais via variáveis de ambiente, GitHub Secrets e configuração segura na VPS;
* scanner de secrets no fluxo local e no CI;
* containers devem evitar execução como root sempre que possível;
* Postgres não será exposto publicamente;
* SSH por chave;
* firewall ativo no host;
* TLS obrigatório;
* Grafana protegido por autenticação e/ou restrição de acesso;
* healthchecks obrigatórios para serviços principais.

### Motivo

* Reduzir risco operacional básico.
* Evitar vazamento de credenciais.
* Tornar o projeto coerente com o posicionamento técnico proposto.

### Consequência

* Segurança deixa de ser apenas convenção e passa a ser requisito explícito de arquitetura e pipeline.

---

## 12. Persistência, Backup e Recuperação

### Decisão

* O PostgreSQL terá backup recorrente.
* O restore deverá ser documentado.
* Os dados operacionais do Learning in Public serão persistidos.
* O conteúdo humano continuará versionado no Git.

### Motivo

* Separar dados reconstruíveis de dados operacionais.
* Evitar perda de histórico processado.
* Garantir capacidade mínima de recuperação.

### Regra prática

* conteúdo editorial pode ser regenerado a partir do repositório;
* dados operacionais do banco exigem backup;
* a restauração deve ser testável e documentada.

### Consequência

* O projeto precisa definir frequência de backup, retenção e procedimento de recuperação.

---

## 13. Política de Escopo da v1

### Entram na v1

* Home;
* Projetos;
* Sobre;
* Conteúdos;
* Contato;
* Nexo 360 como projeto-âncora;
* projetos em destaque;
* stack principal;
* indicadores estáticos;
* Learning in Public funcional em versão simples;
* deploy automatizado;
* observabilidade básica;
* HTTPS obrigatório.

### Ficam fora da v1

* CMS completo;
* painel administrativo completo;
* múltiplas integrações editoriais complexas;
* busca interna avançada;
* analytics sofisticado;
* workflow editorial avançado;
* moderação complexa;
* internacionalização.

### Motivo

* Controlar escopo.
* Entregar valor real sem inflar complexidade desnecessária.
* Priorizar posicionamento, prova técnica e operação estável.

---

## 14. Resumo Executivo das Decisões

### Infraestrutura e Runtime

* VPS OVH
* Docker Compose
* Nginx
* TLS obrigatório
* domínio principal `diegosantos.me`

### Persistência e Conteúdo

* PostgreSQL desde a v1
* Markdown versionado no repositório
* sincronização Markdown → banco

### Funcionalidade dinâmica

* Learning in Public com PRs merged
* poucos repositórios na v1
* cron job
* resumo curto + categoria + link
* publicação automática configurável

### Entrega e Operação

* GitHub Actions na `main`
* lint, testes, build, segurança básica e deploy
* atualização remota por imagem publicada

### Observabilidade e Segurança

* Promtail, Loki, Prometheus e Grafana
* logs estruturados
* alertas mínimos
* secrets fora do repositório
* Postgres sem exposição pública
* acesso protegido aos serviços operacionais

---

## 15. Próximos Documentos Derivados

A partir destas decisões, os próximos documentos recomendados são:

* `requisitos-funcionais.md`
* `requisitos-nao-funcionais.md`
* `modelo-de-dados.md`
* `topologia-deploy.md`
* `runbook-deploy.md`
* `runbook-backup-restore.md`
* `adr-learning-in-public.md`

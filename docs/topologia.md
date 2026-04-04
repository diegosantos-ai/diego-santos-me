# Topologia de Deploy — Portfólio Profissional Diego Santos

## Objetivo

Descrever a topologia de deploy da v1 do portfólio profissional, definindo os serviços que compõem o ambiente de produção, suas responsabilidades, relações, persistência, exposição de rede e pontos de observabilidade.

Este documento é o mapa operacional da aplicação em runtime.

---

## 1. Visão Geral

A v1 será implantada em uma **VPS da OVH**, utilizando **Docker Compose** como mecanismo principal de runtime e orquestração local do ambiente de produção.

A topologia será composta por serviços separados, com responsabilidades explícitas:

* reverse proxy;
* aplicação principal;
* worker do Learning in Public;
* banco de dados PostgreSQL;
* stack de observabilidade.

### Objetivo da separação

* reduzir acoplamento;
* facilitar troubleshooting;
* permitir reinício isolado de serviços;
* manter o bloco Learning in Public desacoplado da aplicação pública;
* tornar operação e evolução mais previsíveis.

---

## 2. Serviços da Topologia

## 2.1. `nginx`

### Papel

Serviço responsável pela entrada pública da aplicação.

### Responsabilidades

* receber tráfego HTTP/HTTPS;
* encerrar TLS;
* redirecionar HTTP para HTTPS;
* redirecionar `www` para o domínio principal;
* encaminhar requisições para a aplicação principal;
* aplicar headers básicos de segurança;
* proteger acessos internos quando necessário, como Grafana.

### Exposição

* exposto publicamente
* portas esperadas:

  * `80`
  * `443`

### Dependências

* `app`

---

## 2.2. `app`

### Papel

Aplicação principal do portfólio responsável por renderização pública, leitura da base operacional e entrega das páginas principais.

### Responsabilidades

* servir Home, Projetos, Sobre, Conteúdos e Contato;
* ler projetos, conteúdos e eventos publicados do banco;
* renderizar os dados editoriais;
* exibir o bloco Learning in Public com base nos itens publicados;
* expor healthcheck;
* emitir logs estruturados.

### Exposição

* não exposto diretamente à internet;
* acessível apenas pela rede interna do Docker;
* porta interna definida pela aplicação.

### Dependências

* `postgres`

---

## 2.3. `worker-learning`

### Papel

Serviço responsável pelo processamento assíncrono do Learning in Public.

### Responsabilidades

* executar rotina agendada;
* consultar PRs merged em repositórios configurados;
* evitar reprocessamento duplicado;
* gerar resumo curto, categoria técnica e link;
* registrar falhas e status de processamento;
* persistir eventos processados no banco;
* respeitar modo automático ou revisão manual.

### Exposição

* não exposto publicamente;
* acessível apenas via rede interna.

### Dependências

* `postgres`
* acesso externo à API do GitHub
* acesso ao provedor LLM definido para enriquecimento do resumo

---

## 2.4. `postgres`

### Papel

Banco de dados operacional da aplicação.

### Responsabilidades

* armazenar projetos;
* armazenar conteúdos;
* armazenar links e metadados;
* armazenar eventos do Learning in Public;
* armazenar rastreamento de sincronização.

### Exposição

* não exposto publicamente;
* acessível apenas na rede interna do Docker.

### Persistência

* volume persistente obrigatório.

### Dependências

* nenhuma dependência de aplicação

---

## 2.5. `promtail`

### Papel

Coletor de logs dos containers da stack.

### Responsabilidades

* ler logs estruturados dos serviços;
* enviar logs para o Loki;
* preservar labels úteis para troubleshooting.

### Exposição

* não exposto publicamente.

### Dependências

* `loki`

---

## 2.6. `loki`

### Papel

Armazenamento e consulta de logs.

### Responsabilidades

* receber logs do Promtail;
* disponibilizar consulta para o Grafana.

### Exposição

* não exposto publicamente;
* acessível apenas na rede interna.

### Persistência

* volume persistente recomendado.

---

## 2.7. `prometheus`

### Papel

Coleta e armazenamento de métricas.

### Responsabilidades

* coletar métricas da aplicação e dos serviços observáveis;
* manter séries temporais mínimas para dashboards e alertas.

### Exposição

* não exposto publicamente;
* acessível apenas na rede interna.

### Persistência

* volume persistente recomendado.

---

## 2.8. `grafana`

### Papel

Visualização de métricas, logs e dashboards operacionais.

### Responsabilidades

* exibir dashboards da aplicação;
* exibir métricas do worker;
* consultar logs via Loki;
* apoiar troubleshooting e validação operacional.

### Exposição

* não deve ficar exposto publicamente sem proteção;
* acesso via proxy protegido ou acesso restrito.

### Dependências

* `prometheus`
* `loki`

### Persistência

* volume persistente recomendado para configuração e dashboards.

---

## 3. Fluxo de Tráfego Público

O fluxo público da aplicação seguirá esta ordem:

1. o usuário acessa `https://diegosantos.me`;
2. o tráfego chega ao `nginx`;
3. o `nginx` valida HTTPS, redirecionamentos e regras de proxy;
4. a requisição é encaminhada para o serviço `app`;
5. o `app` consulta o `postgres` quando necessário;
6. a resposta é renderizada e devolvida ao usuário.

### Regra

Nenhum serviço interno além do reverse proxy deve ser diretamente exposto ao público.

---

## 4. Fluxo do Learning in Public

O fluxo do Learning in Public seguirá esta ordem:

1. o `worker-learning` é acionado por rotina agendada;
2. o worker consulta repositórios configurados no GitHub;
3. identifica PRs merged elegíveis;
4. verifica se o evento já foi processado;
5. monta payload controlado para enriquecimento;
6. gera resumo curto e categoria técnica;
7. persiste o evento no `postgres` com status adequado;
8. eventos publicados passam a ser lidos pelo `app` e exibidos na Home.

### Regra

A falha do worker não pode derrubar a aplicação principal.

---

## 5. Fluxo Editorial de Conteúdo

O conteúdo editorial seguirá esta ordem:

1. o conteúdo é editado em Markdown no repositório;
2. o deploy ou rotina de sincronização processa os arquivos;
3. o conteúdo é convertido para representação operacional;
4. os registros são persistidos no `postgres`;
5. o `app` renderiza a partir do banco.

### Regra

Markdown é fonte de edição humana. PostgreSQL é fonte operacional de leitura da aplicação.

---

## 6. Redes

## 6.1. Rede principal

Todos os serviços da stack devem compartilhar uma rede Docker interna dedicada ao projeto.

### Objetivo

* permitir comunicação privada entre serviços;
* evitar exposição indevida;
* manter isolamento da topologia do projeto.

## 6.2. Exposição externa

Apenas o `nginx` deve publicar portas para o host.

### Regra

* `app`, `worker-learning`, `postgres`, `promtail`, `loki`, `prometheus` e `grafana` não devem ser expostos diretamente à internet.

---

## 7. Volumes Persistentes

A topologia da v1 deve prever persistência explícita para os seguintes serviços:

### Obrigatórios

* `postgres`

### Recomendados

* `loki`
* `prometheus`
* `grafana`
* diretório de certificados/TLS do proxy, conforme estratégia adotada

### Objetivo

* preservar dados operacionais;
* manter dashboards e configuração;
* evitar perda de estado em reinícios ou atualizações.

---

## 8. Variáveis de Ambiente e Configuração

Todos os serviços devem ser configurados por variáveis de ambiente, arquivos de configuração versionados ou ambos, conforme a responsabilidade do serviço.

### Exemplos de configuração esperada

* domínio público;
* conexão com PostgreSQL;
* credenciais do GitHub;
* credenciais do provedor LLM;
* flags do Learning in Public;
* parâmetros de publicação automática;
* credenciais do Grafana;
* configuração de TLS e proxy.

### Regra

Nenhuma credencial real deve ser hardcoded na imagem, no repositório ou no `docker-compose.yml`.

---

## 9. Healthchecks e Disponibilidade

A topologia deve incluir healthchecks para os principais serviços da aplicação.

### Obrigatórios

* `app`
* `postgres`
* `worker-learning` com critério operacional mínimo

### Recomendados

* `nginx`
* `grafana`
* `prometheus`
* `loki`

### Objetivo

* apoiar deploy seguro;
* facilitar troubleshooting;
* permitir alertas mínimos.

---

## 10. Observabilidade da Topologia

A observabilidade da stack deve cobrir dois eixos:

### 10.1. Logs

* logs estruturados emitidos por `app` e `worker-learning`;
* coleta por `promtail`;
* armazenamento e consulta via `loki`.

### 10.2. Métricas

* métricas da aplicação;
* métricas do worker;
* métricas de disponibilidade dos serviços críticos;
* coleta via `prometheus`;
* visualização via `grafana`.

### Alertas mínimos recomendados

* aplicação indisponível;
* falha repetida do worker;
* erro elevado na aplicação;
* falha de conexão com banco.

---

## 11. Segurança da Topologia

A topologia deve seguir as seguintes regras mínimas:

* somente o reverse proxy exposto publicamente;
* PostgreSQL sem exposição externa;
* Grafana protegido por autenticação e/ou restrição de acesso;
* TLS obrigatório;
* secrets injetados por ambiente seguro;
* containers com privilégio mínimo sempre que possível;
* acesso SSH ao host por chave.

### Objetivo

* reduzir superfície de ataque;
* manter coerência com o posicionamento técnico do projeto;
* evitar fragilidade básica de operação.

---

## 12. Estratégia de Deploy em Produção

A topologia será atualizada por pipeline automatizada.

### Fluxo esperado

1. merge na `main` aciona a pipeline;
2. a pipeline executa lint, testes, build e validações básicas;
3. a imagem da aplicação é publicada em registry;
4. a VPS executa atualização remota;
5. `docker compose pull` atualiza imagens necessárias;
6. `docker compose up -d` reconcilia os serviços;
7. healthchecks e validação pós-deploy confirmam o estado operacional.

### Regra

O servidor não deve depender de build manual como caminho principal de entrega.

---

## 13. Representação Lógica Resumida

```text
Internet
   |
   v
[Nginx : 80/443]
   |
   v
[App]
   |
   v
[PostgreSQL]

[Worker Learning] ---> GitHub API
[Worker Learning] ---> LLM Provider
[Worker Learning] ---> PostgreSQL

[Promtail] ---> [Loki]
[Prometheus] ---> métricas da stack
[Grafana] ---> [Prometheus + Loki]
```

---

## 14. Estado-Alvo da v1

A topologia da v1 será considerada alinhada quando:

* o acesso público ocorrer exclusivamente via Nginx;
* a aplicação principal estiver desacoplada do worker;
* PostgreSQL estiver persistente e não exposto publicamente;
* a stack de observabilidade estiver funcional;
* o Learning in Public operar sem depender do processo principal;
* o deploy puder atualizar a stack sem reconfiguração manual extensa.

---

## 15. Próximos Artefatos Recomendados

Os próximos documentos mais úteis a partir desta topologia são:

* `runbook-deploy.md`
* `runbook-backup-restore.md`
* `adr-learning-in-public.md`
* `migrations-iniciais.md`
* `checklist-producao-v1.md`

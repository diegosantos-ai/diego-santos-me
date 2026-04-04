# Matriz de Variáveis de Ambiente — Portfólio Profissional Diego Santos

## Objetivo

Consolidar as variáveis de ambiente necessárias para a v1 do portfólio profissional, organizando por domínio funcional, criticidade, obrigatoriedade e uso operacional.

Este documento serve como referência para:

* `.env.example`;
* configuração local;
* configuração da VPS;
* secrets do CI/CD;
* documentação de operação.

---

## 1. Regras Gerais

### Princípios

* nenhuma credencial real deve ser versionada no repositório;
* todas as variáveis obrigatórias devem constar no `.env.example`;
* valores sensíveis devem vir de ambiente seguro;
* nomes devem ser estáveis e previsíveis;
* a aplicação deve falhar de forma explícita quando variável crítica obrigatória estiver ausente.

### Classificação usada neste documento

* **Obrigatória:** necessária para funcionamento correto.
* **Opcional:** possui valor padrão, fallback ou uso condicional.
* **Sensível:** não pode ser versionada com valor real.

---

## 2. Domínio da Aplicação

| Variável               | Obrigatória | Sensível | Finalidade                                                  | Exemplo conceitual       |
| ---------------------- | ----------- | -------: | ----------------------------------------------------------- | ------------------------ |
| `APP_ENV`              | Sim         |      Não | Define o ambiente de execução                               | `production`             |
| `APP_NAME`             | Sim         |      Não | Identificação da aplicação                                  | `portfolio-diego-santos` |
| `APP_PORT`             | Sim         |      Não | Porta interna ou publicada conforme estratégia da app       | `3000`                   |
| `APP_BASE_URL`         | Sim         |      Não | URL pública canônica da aplicação                           | `https://diegosantos.me` |
| `APP_LOG_LEVEL`        | Sim         |      Não | Nível de log da aplicação                                   | `info`                   |
| `APP_ENABLE_DEBUG`     | Não         |      Não | Habilita comportamento de debug em ambientes não produtivos | `false`                  |
| `APP_HEALTHCHECK_PATH` | Sim         |      Não | Caminho de healthcheck da app base (`web-app`)              | `/health`                |
| `JAVA_OPTS`            | Sim         |      Não | Flags de restrição e tuning de RAM para `portfolio-api-java`| `-Xms256m -Xmx256m`      |

---

## 3. Domínio do Banco de Dados

| Variável            | Obrigatória | Sensível | Finalidade                                 | Exemplo conceitual |
| ------------------- | ----------- | -------: | ------------------------------------------ | ------------------ |
| `POSTGRES_HOST`     | Sim         |      Não | Host do PostgreSQL                         | `postgres`         |
| `POSTGRES_PORT`     | Sim         |      Não | Porta do PostgreSQL                        | `5432`             |
| `POSTGRES_DB`       | Sim         |      Não | Nome do banco                              | `portfolio_db`     |
| `POSTGRES_USER`     | Sim         |      Sim | Usuário de acesso ao banco                 | `portfolio_user`   |
| `POSTGRES_PASSWORD` | Sim         |      Sim | Senha do banco                             | `***`              |
| `DATABASE_URL`      | Sim         |      Sim | String de conexão consolidada da aplicação | `postgresql://...` |

### Regra

A aplicação deve usar preferencialmente `DATABASE_URL` ou composição controlada equivalente, sem hardcode.

---

## 4. Domínio do Learning in Public

| Variável                      | Obrigatória | Sensível | Finalidade                                          | Exemplo conceitual |
| ----------------------------- | ----------- | -------: | --------------------------------------------------- | ------------------ |
| `LEARNING_ENABLED`            | Sim         |      Não | Liga ou desliga o modulo dinâmico da API Java       | `true`             |
| `LEARNING_REPOSITORIES`       | Sim         |      Não | Lista de repositórios monitorados                   | `repo-a,repo-b`    |
| `LEARNING_CRON_SCHEDULE`      | Sim         |      Não | Agenda de execução da rotina (cron spring formato)  | `0 */30 * * * *`   |
| `LEARNING_AUTO_PUBLISH`       | Sim         |      Não | Define se a publicação é automática                 | `false`            |
| `LEARNING_MAX_ITEMS_PER_RUN`  | Não         |      Não | Limita quantidade processada por execução           | `10`               |
| `LEARNING_SUMMARY_MAX_LENGTH` | Não         |      Não | Limite do resumo público                            | `240`              |
| `LEARNING_DEFAULT_STATUS`     | Não         |      Não | Status padrão quando auto publish estiver desligado | `pending`          |

---

## 5. Integração com GitHub

| Variável                         | Obrigatória | Sensível | Finalidade                         | Exemplo conceitual       |
| -------------------------------- | ----------- | -------: | ---------------------------------- | ------------------------ |
| `GITHUB_TOKEN`                   | Sim         |      Sim | Token para consultar API do GitHub | `***`                    |
| `GITHUB_API_BASE_URL`            | Não         |      Não | URL base da API do GitHub          | `https://api.github.com` |
| `GITHUB_REQUEST_TIMEOUT_SECONDS` | Não         |      Não | Timeout das chamadas ao GitHub     | `15`                     |

### Regra

O token deve ter apenas o escopo mínimo necessário para leitura da origem usada pelo Learning in Public.

---

## 6. Integração com LLM

| Variável                      | Obrigatória | Sensível | Finalidade                                           | Exemplo conceitual |
| ----------------------------- | ----------- | -------: | ---------------------------------------------------- | ------------------ |
| `LLM_PROVIDER`                | Sim         |      Não | Provedor configurado para enriquecimento dos eventos | `openai`           |
| `LLM_API_KEY`                 | Sim         |      Sim | Chave do provedor LLM                                | `***`              |
| `LLM_MODEL`                   | Sim         |      Não | Modelo usado no resumo do Learning in Public         | `gpt-4.1-mini`     |
| `LLM_REQUEST_TIMEOUT_SECONDS` | Não         |      Não | Timeout da chamada ao provedor                       | `20`               |
| `LLM_MAX_INPUT_TOKENS`        | Não         |      Não | Limite de payload enviado                            | `4000`             |
| `LLM_MAX_OUTPUT_TOKENS`       | Não         |      Não | Limite de resposta esperada                          | `300`              |

### Regra

O payload enviado à LLM deve ser controlado, sanitizado e mínimo.

---

## 7. Conteúdo Editorial e Sincronização

| Variável                 | Obrigatória | Sensível | Finalidade                                 | Exemplo conceitual |
| ------------------------ | ----------- | -------: | ------------------------------------------ | ------------------ |
| `CONTENT_SYNC_ENABLED`   | Sim         |      Não | Liga ou desliga a sincronização editorial  | `true`             |
| `CONTENT_SOURCE_DIR`     | Sim         |      Não | Diretório raiz do conteúdo Markdown        | `content`          |
| `CONTENT_SYNC_ON_DEPLOY` | Sim         |      Não | Define se a sincronização ocorre no deploy | `true`             |
| `CONTENT_DEFAULT_STATUS` | Não         |      Não | Status padrão de registros importados      | `draft`            |

---

## 8. Domínio do Reverse Proxy e Domínio Público

| Variável            | Obrigatória | Sensível | Finalidade                                                               | Exemplo conceitual       |
| ------------------- | ----------- | -------: | ------------------------------------------------------------------------ | ------------------------ |
| `PRIMARY_DOMAIN`    | Sim         |      Não | Domínio público principal                                                | `diegosantos.me`         |
| `WWW_DOMAIN`        | Sim         |      Não | Domínio alternativo para redirecionamento                                | `www.diegosantos.me`     |
| `TLS_EMAIL`         | Sim         |      Não | E-mail operacional para emissão/gestão de certificados, quando aplicável | `contato@diegosantos.me` |
| `NGINX_SERVER_NAME` | Sim         |      Não | Nome do servidor usado no proxy                                          | `diegosantos.me`         |

---

## 9. Observabilidade

| Variável                     | Obrigatória | Sensível | Finalidade                                     | Exemplo conceitual |
| ---------------------------- | ----------- | -------: | ---------------------------------------------- | ------------------ |
| `OBSERVABILITY_ENABLED`      | Sim         |      Não | Liga ou desliga componentes de observabilidade | `true`             |
| `PROMETHEUS_SCRAPE_INTERVAL` | Não         |      Não | Intervalo de coleta de métricas                | `15s`              |
| `GRAFANA_ADMIN_USER`         | Sim         |      Sim | Usuário administrativo inicial do Grafana      | `admin`            |
| `GRAFANA_ADMIN_PASSWORD`     | Sim         |      Sim | Senha administrativa inicial do Grafana        | `***`              |
| `LOKI_RETENTION_PERIOD`      | Não         |      Não | Período de retenção de logs                    | `7d`               |

### Regra

Grafana não deve ser exposto sem autenticação e proteção adequadas.

---

## 10. CI/CD e Deploy

| Variável            | Obrigatória | Sensível | Finalidade                                    | Exemplo conceitual |
| ------------------- | ----------- | -------: | --------------------------------------------- | ------------------ |
| `DEPLOY_ENABLED`    | Sim         |      Não | Liga ou desliga o passo de deploy no pipeline | `true`             |
| `DEPLOY_HOST`       | Sim         |      Sim | Host da VPS para deploy remoto                | `***`              |
| `DEPLOY_USER`       | Sim         |      Sim | Usuário remoto de deploy                      | `***`              |
| `DEPLOY_SSH_KEY`    | Sim         |      Sim | Chave privada usada pela pipeline             | `***`              |
| `DEPLOY_PATH`       | Sim         |      Não | Diretório do projeto na VPS                   | `/opt/portfolio`   |
| `REGISTRY_URL`      | Sim         |      Não | URL do registry de imagens                    | `ghcr.io/...`      |
| `REGISTRY_USERNAME` | Sim         |      Sim | Usuário do registry                           | `***`              |
| `REGISTRY_PASSWORD` | Sim         |      Sim | Credencial/token do registry                  | `***`              |
| `IMAGE_NAME`        | Sim         |      Não | Nome da imagem publicada                      | `portfolio-app`    |
| `IMAGE_TAG`         | Não         |      Não | Tag da imagem usada no deploy                 | `latest`           |

---

## 11. Backup e Rotina Operacional

| Variável                | Obrigatória | Sensível | Finalidade                       | Exemplo conceitual       |
| ----------------------- | ----------- | -------: | -------------------------------- | ------------------------ |
| `BACKUP_ENABLED`        | Sim         |      Não | Liga ou desliga rotina de backup | `true`                   |
| `BACKUP_RETENTION_DAYS` | Sim         |      Não | Quantidade de dias de retenção   | `7`                      |
| `BACKUP_DIR`            | Sim         |      Não | Diretório persistente de backup  | `/var/backups/portfolio` |
| `BACKUP_SCHEDULE`       | Sim         |      Não | Agendamento do backup            | `0 2 * * *`              |

---

## 12. Variáveis Recomendadas no `.env.example`

O `.env.example` da v1 deve contemplar, no mínimo, as variáveis dos seguintes grupos:

* aplicação;
* banco;
* GitHub;
* LLM;
* Learning in Public;
* sincronização editorial;
* domínio público;
* observabilidade;
* backup.

### Regra

Variáveis necessárias apenas para GitHub Actions podem ficar documentadas separadamente quando não fizer sentido constarem no `.env` local.

---

## 13. Matriz de Criticidade

### Críticas para boot da aplicação

* `APP_ENV`
* `APP_BASE_URL`
* `DATABASE_URL`
* `POSTGRES_HOST`
* `POSTGRES_DB`
* `POSTGRES_USER`
* `POSTGRES_PASSWORD`

### Críticas para Learning in Public

* `LEARNING_ENABLED`
* `LEARNING_REPOSITORIES`
* `GITHUB_TOKEN`
* `LLM_API_KEY`
* `LLM_MODEL`

### Críticas para deploy

* `DEPLOY_HOST`
* `DEPLOY_USER`
* `DEPLOY_SSH_KEY`
* `REGISTRY_URL`
* `REGISTRY_USERNAME`
* `REGISTRY_PASSWORD`

### Críticas para observabilidade protegida

* `GRAFANA_ADMIN_USER`
* `GRAFANA_ADMIN_PASSWORD`

---

## 14. Regras de Validação

A aplicação deve validar, na inicialização:

* presença das variáveis obrigatórias do seu contexto;
* coerência mínima de formatos críticos;
* falha explícita quando faltar variável sensível essencial.

### Exemplo de falha aceitável

* impedir boot do backend (Java) sem `GITHUB_TOKEN` ou `LLM_API_KEY` quando o Learning in Public estiver ativado.

---

## 15. Regras de Segurança

* nunca versionar valores reais de secrets;
* nunca reutilizar `.env` local como fonte de produção;
* evitar privilégios excessivos nos tokens;
* documentar claramente quais variáveis vivem no GitHub Actions e quais vivem na VPS;
* rotacionar credenciais quando necessário.

---

## 16. Critério de Aceite

A matriz de variáveis da v1 será considerada suficiente quando:

* cobrir aplicação, banco, Learning in Public, observabilidade e deploy;
* diferenciar variáveis sensíveis das não sensíveis;
* orientar a criação do `.env.example`;
* orientar a configuração da VPS e do CI/CD;
* reduzir ambiguidade na operação do ambiente.

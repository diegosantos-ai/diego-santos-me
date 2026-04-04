# Runbook de Deploy — Portfólio Profissional Diego Santos

## Objetivo

Definir o procedimento operacional padrão de deploy da v1 do portfólio profissional, cobrindo preparação, execução, validação pós-deploy, rollback e tratamento inicial de falhas.

Este documento existe para tornar o deploy reproduzível, auditável e menos dependente de memória informal.

---

## 1. Escopo

Este runbook cobre:

* deploy da aplicação principal;
* atualização dos containers em produção;
* sincronização editorial necessária para a v1;
* validação operacional básica após entrega;
* rollback inicial em caso de falha.

Este runbook não cobre em profundidade:

* recuperação completa de desastre;
* rotação de segredos;
* migração manual complexa de banco;
* troubleshooting avançado de infraestrutura do host.

---

## 2. Premissas

O processo descrito neste documento assume que:

* a aplicação está hospedada em VPS da OVH;
* o runtime usa Docker Compose;
* o reverse proxy é Nginx;
* a pipeline de CI/CD é executada via GitHub Actions;
* a branch `main` é a branch de entrega;
* a aplicação principal é distribuída por imagem publicada em registry;
* o banco PostgreSQL já está provisionado e persistente;
* a stack de observabilidade já está definida na topologia da v1.

---

## 3. Responsabilidades Operacionais

## 3.1. Pipeline

Responsável por:

* validar código;
* executar lint e testes;
* buildar imagem;
* executar validações básicas de segurança;
* publicar artefato;
* acionar atualização remota.

## 3.2. VPS

Responsável por:

* executar containers definidos no `docker-compose.yml`;
* manter volumes persistentes;
* disponibilizar runtime da aplicação;
* servir tráfego por Nginx;
* armazenar estado operacional dos serviços locais.

## 3.3. Operador

Responsável por:

* validar pré-condições quando necessário;
* acompanhar logs da pipeline;
* validar resultado pós-deploy;
* aplicar rollback quando o deploy não atingir o estado esperado.

---

## 4. Gatilho de Deploy

### Regra principal

O deploy da v1 é disparado por **merge na branch `main`**.

### Consequência

Qualquer alteração que entre em `main` deve ser tratada como potencialmente implantável.

### Recomendação

Antes do merge, a mudança deve estar compatível com:

* lint;
* testes;
* build;
* validações de segurança básicas;
* coerência com as decisões arquiteturais da v1.

---

## 5. Fluxo Operacional do Deploy

O fluxo esperado é o seguinte:

1. mudança aprovada entra em `main`;
2. GitHub Actions inicia a pipeline;
3. a pipeline executa validações;
4. a imagem da aplicação é buildada;
5. a imagem é publicada em registry;
6. a VPS recebe ou executa o passo de atualização remota;
7. `docker compose pull` atualiza imagens necessárias;
8. `docker compose up -d` reconcilia os serviços;
9. healthchecks e validações pós-deploy confirmam o estado do ambiente;
10. o deploy é considerado concluído apenas após validação operacional básica.

---

## 6. Pré-condições de Deploy

Antes de considerar o ambiente apto para deploy, os seguintes itens devem existir:

### Infraestrutura e runtime

* VPS acessível por SSH com chave;
* Docker e Docker Compose operacionais;
* volumes persistentes configurados;
* Nginx operacional;
* domínio e TLS válidos;
* rede Docker do projeto funcional.

### Configuração

* variáveis de ambiente definidas na VPS;
* segredos disponíveis de forma segura;
* `docker-compose.yml` coerente com a topologia atual;
* acesso ao registry configurado.

### Banco e dados

* PostgreSQL ativo;
* migrations prontas para execução quando aplicável;
* backup recente disponível antes de alterações sensíveis.

### Pipeline

* secrets do GitHub configurados;
* permissões de deploy funcionando;
* workflow da pipeline ativo e validado.

---

## 7. Etapas da Pipeline

A pipeline da v1 deve executar no mínimo as seguintes etapas:

## 7.1. Lint

Validar:

* qualidade de código;
* formatação necessária;
* arquivos de configuração relevantes;
* consistência mínima da aplicação e automações.

## 7.2. Testes

Executar:

* testes automatizados definidos para a aplicação;
* validações mínimas do comportamento esperado da build.

## 7.3. Build

Executar:

* build da aplicação;
* build da imagem de runtime;
* validação básica do artefato gerado.

## 7.4. Segurança básica

Executar ao menos:

* detecção de secrets;
* validação básica da imagem e/ou dependências, conforme escopo da v1.

## 7.5. Publicação

Executar:

* publicação da imagem em registry;
* marcação identificável da versão implantável.

## 7.6. Deploy remoto

Executar:

* atualização do ambiente na VPS;
* reconciliação dos serviços via Docker Compose.

---

## 8. Estratégia de Atualização na VPS

A atualização remota deve seguir o padrão abaixo:

1. autenticar no servidor de forma segura;
2. autenticar no registry, se necessário;
3. atualizar referência da imagem implantável;
4. executar `docker compose pull`;
5. executar `docker compose up -d`;
6. garantir que os serviços subam com os parâmetros corretos;
7. validar healthchecks e logs básicos.

### Diretriz

O servidor não deve ser usado como ambiente principal de build manual.

### Objetivo

* reduzir drift;
* manter reprodutibilidade;
* facilitar rollback.

---

## 9. Migrations e Sincronização de Conteúdo

## 9.1. Migrations

Quando houver alteração de schema:

* migrations devem ser executadas de forma controlada;
* a aplicação não deve assumir schema novo sem atualização explícita do banco;
* mudanças destrutivas devem exigir atenção adicional e backup recente.

## 9.2. Sincronização editorial

O deploy deve incluir ou acionar o fluxo que:

* lê conteúdo Markdown do repositório;
* transforma o conteúdo em representação operacional;
* persiste ou atualiza os dados no PostgreSQL.

### Regra

Conteúdo editorial e runtime operacional precisam permanecer consistentes após o deploy.

---

## 10. Validação Pós-Deploy

O deploy só deve ser considerado bem-sucedido após as validações abaixo.

## 10.1. Validação pública

Confirmar:

* domínio principal acessível;
* HTTPS válido;
* redirecionamento correto de `www`;
* Home carregando sem erro;
* navegação principal acessível.

## 10.2. Validação funcional mínima

Confirmar:

* projeto-âncora visível;
* conteúdos publicados carregando;
* seção Contato acessível;
* bloco Learning in Public renderizando corretamente os itens publicados.

## 10.3. Validação operacional

Confirmar:

* containers principais em estado saudável;
* aplicação respondendo ao healthcheck;
* logs estruturados sendo emitidos;
* banco acessível pela aplicação;
* worker operacional;
* Prometheus e Grafana acessíveis conforme política de proteção;
* logs chegando ao Loki, quando aplicável.

## 10.4. Validação do Learning in Public

Confirmar:

* worker conseguiu iniciar;
* consulta ao banco funcional;
* nenhum erro crítico recorrente no processamento;
* itens publicados continuam acessíveis no front.

---

## 11. Critérios de Sucesso do Deploy

Um deploy é considerado bem-sucedido quando:

* a pipeline conclui sem falhas críticas;
* a nova imagem está rodando em produção;
* os serviços principais estão saudáveis;
* a aplicação pública responde corretamente;
* o conteúdo editorial está consistente;
* não há regressão funcional evidente nas áreas principais;
* logs e métricas continuam operacionais.

---

## 12. Critérios de Falha

O deploy deve ser tratado como falho quando ocorrer qualquer uma das situações abaixo:

* pipeline interrompida antes da publicação do artefato;
* aplicação não sobe após atualização;
* healthcheck falha repetidamente;
* domínio público retorna erro crítico;
* banco não responde à aplicação;
* migrations deixam a aplicação inconsistente;
* conteúdo deixa de ser carregado;
* worker entra em falha contínua com impacto operacional relevante.

---

## 13. Rollback

## 13.1. Quando aplicar rollback

Aplicar rollback quando:

* a aplicação estiver indisponível após o deploy;
* houver regressão crítica sem correção imediata segura;
* a nova versão não estabilizar dentro de janela operacional razoável;
* migrations ou sincronização deixarem o sistema inconsistente.

## 13.2. Estratégia inicial de rollback

A estratégia prioritária da v1 deve ser:

* retornar para a imagem previamente estável;
* reconciliar containers com a versão anterior;
* validar healthchecks;
* confirmar retomada da aplicação pública.

## 13.3. Banco de dados

Se o problema envolver schema ou dados:

* avaliar se rollback de aplicação é suficiente;
* caso necessário, usar procedimento controlado de restauração do banco conforme runbook específico de backup e restore.

### Regra

Rollback de aplicação e rollback de banco não devem ser confundidos.

---

## 14. Observabilidade Durante o Deploy

Durante e após o deploy, os seguintes sinais devem ser observados:

### Logs

* inicialização da aplicação;
* falhas de conexão com banco;
* erro de migração;
* falhas de leitura de variáveis de ambiente;
* erro no worker do Learning in Public;
* falhas do proxy reverso.

### Métricas

* disponibilidade da aplicação;
* tempo de resposta;
* taxa de erro;
* restart inesperado de containers;
* falha recorrente do worker.

### Objetivo

Detectar regressão cedo e reduzir tempo de diagnóstico.

---

## 15. Tratamento Inicial de Incidentes Pós-Deploy

Se o deploy falhar, a sequência inicial deve ser:

1. confirmar em qual etapa ocorreu a falha;
2. distinguir problema de pipeline, aplicação, banco, worker ou proxy;
3. consultar logs do container afetado;
4. validar healthcheck do serviço afetado;
5. verificar conectividade com PostgreSQL;
6. verificar variáveis e segredos necessários;
7. decidir entre correção rápida ou rollback.

### Regra

Não insistir em múltiplas tentativas cegas de redeploy sem diagnóstico mínimo.

---

## 16. Frequência e Disciplina de Deploy

### Diretriz

O deploy deve ser pequeno, frequente e validável.

### Evitar

* acumular grande volume de mudanças sem validação intermediária;
* misturar refatoração ampla com alteração operacional sensível;
* alterar schema, conteúdo e infraestrutura crítica no mesmo ciclo sem controle.

---

## 17. Checklist Operacional Resumido

### Antes do deploy

* alteração em `main`
* pipeline válida
* secrets disponíveis
* banco saudável
* backup recente quando necessário

### Durante o deploy

* build concluído
* imagem publicada
* atualização remota executada
* containers reconciliados

### Depois do deploy

* domínio acessível
* HTTPS válido
* Home funcional
* conteúdo sincronizado
* worker operacional
* logs e métricas disponíveis

---

## 18. Estado-Alvo da Operação

O processo de deploy da v1 estará maduro quando:

* puder ser repetido sem improviso;
* depender minimamente de intervenção manual;
* expor claramente falha ou sucesso;
* permitir rollback objetivo;
* manter consistência entre aplicação, conteúdo e banco;
* ser apoiado por logs, métricas e healthchecks.

---

## 19. Próximos Artefatos Recomendados

Depois deste runbook, os documentos mais úteis são:

* `runbook-backup-restore.md`
* `adr-learning-in-public.md`
* `checklist-producao-v1.md`
* `migrations-iniciais.md`
* `matriz-de-variaveis-de-ambiente.md`

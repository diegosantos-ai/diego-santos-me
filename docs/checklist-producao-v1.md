# Checklist de Produção — v1

## Objetivo

Consolidar a checklist mínima para considerar a v1 apta para produção, cobrindo infraestrutura, aplicação, banco, segurança, observabilidade, conteúdo e operação.

Este documento deve ser usado como verificação final antes da publicação da primeira versão.

---

## 1. Infraestrutura

* [ ] VPS da OVH provisionada e acessível por SSH com chave.
* [ ] Docker instalado e operacional.
* [ ] Docker Compose operacional.
* [ ] diretórios persistentes definidos para serviços com estado.
* [ ] relógio do host consistente.
* [ ] firewall do host configurado.
* [ ] apenas portas públicas necessárias liberadas.

---

## 2. Domínio e HTTPS

* [ ] domínio `diegosantos.me` apontando para a VPS.
* [ ] `www` redirecionando para o domínio principal.
* [ ] TLS configurado e válido.
* [ ] redirecionamento HTTP → HTTPS validado.
* [ ] Nginx respondendo corretamente ao domínio público.

---

## 3. Runtime da Aplicação

* [ ] `docker-compose.yml` alinhado à topologia definida.
* [ ] serviço `nginx` configurado.
* [ ] serviço `app` configurado.
* [ ] serviço `worker-learning` configurado.
* [ ] serviço `postgres` configurado.
* [ ] stack de observabilidade configurada.
* [ ] healthchecks definidos para serviços principais.
* [ ] containers sobem sem erro crítico.

---

## 4. Banco de Dados

* [ ] PostgreSQL persistente.
* [ ] volume de dados validado.
* [ ] migrations iniciais aplicadas.
* [ ] aplicação conecta ao banco corretamente.
* [ ] entidades principais presentes no schema inicial.
* [ ] backup inicial executado e validado.

---

## 5. Variáveis de Ambiente e Segredos

* [ ] `.env.example` consistente com a aplicação.
* [ ] segredos reais fora do repositório.
* [ ] variáveis obrigatórias configuradas na VPS.
* [ ] segredos da pipeline configurados no GitHub.
* [ ] credenciais do GitHub para o Learning in Public configuradas.
* [ ] credenciais do provedor LLM configuradas.
* [ ] credenciais do Grafana protegidas.

---

## 6. Aplicação Pública

* [ ] Home carregando corretamente.
* [ ] hero comunicando a proposta principal com clareza.
* [ ] navegação principal funcionando.
* [ ] seção Projetos operacional.
* [ ] Nexo 360 exibido como projeto-âncora.
* [ ] seção Sobre operacional.
* [ ] seção Conteúdos operacional.
* [ ] seção Contato operacional.
* [ ] responsividade básica validada.

---

## 7. Conteúdo Editorial

* [ ] projetos publicados carregados do banco.
* [ ] conteúdos publicados carregados do banco.
* [ ] sincronização Markdown → banco funcionando.
* [ ] itens ocultos não aparecem publicamente.
* [ ] ordem editorial respeitada.
* [ ] links de projetos e conteúdos válidos.

---

## 8. Learning in Public

* [ ] worker agendado configurado.
* [ ] repositórios iniciais definidos.
* [ ] coleta de PRs merged funcionando.
* [ ] prevenção de duplicidade validada.
* [ ] persistência dos eventos validada.
* [ ] status de publicação funcionando.
* [ ] cards publicados renderizando na Home.
* [ ] clique no card leva ao link correto.
* [ ] modo automático ou revisão manual definido.

---

## 9. CI/CD

* [ ] workflow de GitHub Actions configurado.
* [ ] merge na `main` dispara pipeline.
* [ ] etapa de lint funcionando.
* [ ] etapa de testes funcionando.
* [ ] etapa de build funcionando.
* [ ] validação básica de segurança funcionando.
* [ ] publicação de imagem em registry funcionando.
* [ ] atualização remota da VPS funcionando.

---

## 10. Observabilidade

* [ ] logs estruturados emitidos pela aplicação.
* [ ] logs estruturados emitidos pelo worker.
* [ ] Promtail enviando logs para Loki.
* [ ] Prometheus coletando métricas básicas.
* [ ] Grafana acessível de forma protegida.
* [ ] dashboards mínimos disponíveis.
* [ ] alertas mínimos configurados ou planejados.

---

## 11. Segurança

* [ ] nenhum secret versionado no repositório.
* [ ] gitleaks e validações locais/CI operacionais.
* [ ] PostgreSQL não exposto publicamente.
* [ ] Grafana não exposto sem proteção.
* [ ] TLS obrigatório validado.
* [ ] SSH por chave validado.
* [ ] política de menor privilégio aplicada onde possível.

---

## 12. Operação e Recovery

* [ ] runbook de deploy documentado.
* [ ] runbook de backup e restore documentado.
* [ ] backup diário definido.
* [ ] retenção mínima definida.
* [ ] estratégia de rollback definida.
* [ ] restore de banco entendido pela operação.

---

## 13. Critério de Go Live

A v1 pode ser considerada pronta para publicação quando:

* [ ] a aplicação pública estiver funcional nas cinco seções principais;
* [ ] o deploy estiver automatizado;
* [ ] o banco estiver persistente e inicializado;
* [ ] o Learning in Public estiver funcionando no escopo definido;
* [ ] a observabilidade mínima estiver operacional;
* [ ] os riscos básicos de segurança estiverem tratados;
* [ ] houver procedimento documentado para deploy e recuperação.

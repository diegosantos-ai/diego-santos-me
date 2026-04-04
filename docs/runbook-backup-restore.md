# Runbook de Backup e Restore — Portfólio Profissional Diego Santos

## Objetivo

Definir o procedimento operacional mínimo para backup e restore da v1 do portfólio profissional, com foco em preservação do PostgreSQL e recuperação controlada dos dados operacionais do sistema.

Este documento existe para reduzir risco de perda de estado, padronizar recuperação e evitar restaurações improvisadas.

---

## 1. Escopo

Este runbook cobre:

* backup do PostgreSQL;
* retenção mínima;
* restore controlado;
* distinção entre dados reconstruíveis e dados que exigem backup;
* validação após restauração.

Este documento não cobre em profundidade:

* disaster recovery completo do host;
* replicação de banco;
* alta disponibilidade;
* restore automatizado multiambiente.

---

## 2. Premissas

O procedimento assume que:

* a v1 roda em VPS da OVH;
* o PostgreSQL é persistente e faz parte do runtime da aplicação;
* conteúdo editorial em Markdown continua versionado no repositório;
* o banco armazena dados operacionais e de publicação;
* o ambiente usa Docker Compose.

---

## 3. O que precisa de backup

## Obrigatório

* banco PostgreSQL;
* dados de projetos publicados no estado operacional;
* conteúdos sincronizados no banco;
* eventos processados do Learning in Public;
* metadados de status e sincronização.

## Recomendado

* configuração persistida do Grafana;
* volumes de observabilidade cuja perda gere impacto real de operação;
* arquivos de configuração locais do servidor que não estejam plenamente reproduzidos em repositório.

---

## 4. O que pode ser reconstruído

Os itens abaixo podem ser reconstruídos e, portanto, não são a principal prioridade de backup:

* conteúdo-fonte em Markdown versionado no Git;
* código da aplicação versionado no repositório;
* imagens de container publicadas em registry;
* configuração reproduzível definida em documentação e automação.

### Regra

Git não substitui backup do banco. Banco não substitui versionamento do conteúdo-fonte.

---

## 5. Estratégia de Backup

### Backup mínimo da v1

* backup recorrente do PostgreSQL;
* periodicidade diária;
* retenção inicial entre 7 e 14 dias;
* nomeação clara por data e horário;
* armazenamento fora do diretório transitório do container.

### Recomendação

* manter cópia no host com rotação controlada;
* preferir também cópia externa ou sincronizada para local seguro quando a operação amadurecer.

---

## 6. Janela e Frequência

### Frequência recomendada

* diário para o PostgreSQL;
* adicionalmente antes de mudanças sensíveis, como:

  * migrations com risco;
  * refatoração de schema;
  * alteração de sincronização editorial;
  * mudanças de infraestrutura com potencial de perda.

### Regra

Qualquer alteração potencialmente destrutiva deve ser precedida de backup recente verificável.

---

## 7. Formato e Organização

O backup deve seguir convenção clara de organização.

### Estrutura recomendada

* diretório dedicado para backups;
* nome do arquivo com data/hora;
* separação por tipo de backup quando necessário.

### Exemplo conceitual

* `postgres-backup-YYYYMMDD-HHMM.sql.gz`

### Objetivo

* facilitar identificação;
* evitar sobrescrita indevida;
* melhorar disciplina operacional.

---

## 8. Procedimento de Backup

O procedimento operacional deve seguir esta sequência:

1. confirmar que o PostgreSQL está saudável;
2. identificar o banco correto e o ambiente correto;
3. executar backup lógico consistente;
4. compactar o artefato quando aplicável;
5. salvar em diretório persistente;
6. registrar timestamp do backup;
7. validar que o arquivo foi gerado;
8. aplicar política de retenção.

### Regra

Backup sem verificação de artefato gerado não deve ser considerado válido.

---

## 9. Validação do Backup

Após cada backup, deve-se validar no mínimo:

* arquivo gerado com nome esperado;
* tamanho plausível;
* timestamp correto;
* localização persistente;
* ausência de erro no processo de exportação.

### Recomendação adicional

Executar restore de teste periodicamente para garantir que o backup não seja apenas um arquivo presente, mas um artefato restaurável.

---

## 10. Quando executar Restore

O restore deve ser considerado em cenários como:

* corrupção de dados;
* migration destrutiva malsucedida;
* exclusão indevida com impacto relevante;
* inconsistência grave no banco sem correção segura;
* recuperação pós-incidente.

### Regra

Restore deve ser evento controlado, não tentativa casual de correção.

---

## 11. Estratégia de Restore

A restauração deve seguir a seguinte lógica:

1. identificar claramente o incidente;
2. confirmar se rollback de aplicação resolve sem restore de banco;
3. identificar qual backup deve ser restaurado;
4. isolar risco de sobrescrita indevida;
5. executar restore de forma controlada;
6. validar integridade mínima do sistema após restauração.

### Regra crítica

Rollback de aplicação e restore de banco são operações diferentes e não devem ser confundidas.

---

## 12. Pré-condições para Restore

Antes de restaurar, confirmar:

* qual ambiente será afetado;
* qual backup será usado;
* se existe backup do estado atual antes do restore;
* se a aplicação deve ser colocada em estado controlado durante a operação;
* se a equipe entende o impacto da perda de dados após o ponto restaurado.

---

## 13. Procedimento de Restore

A restauração deve seguir esta ordem:

1. registrar motivo do restore;
2. proteger o estado atual, se necessário;
3. interromper ou isolar fluxos que possam escrever no banco;
4. aplicar o restore do backup escolhido;
5. reativar a aplicação de forma controlada;
6. validar schema, dados e conectividade;
7. confirmar funcionamento da aplicação pública;
8. registrar o resultado da operação.

---

## 14. Validação Pós-Restore

Após o restore, validar no mínimo:

* aplicação conecta ao banco;
* projetos publicados aparecem corretamente;
* conteúdos renderizam normalmente;
* Learning in Public mantém consistência esperada até o ponto restaurado;
* worker não entra em erro por incompatibilidade de schema;
* logs e métricas voltam ao comportamento esperado.

---

## 15. Riscos Operacionais

Os principais riscos são:

* restaurar backup errado;
* sobrescrever dados recentes sem confirmação;
* restaurar schema incompatível com a versão da aplicação em execução;
* supor que Git substitui restore do banco;
* executar restore sem validar impacto no Learning in Public e conteúdo operacional.

---

## 16. Boas Práticas Obrigatórias

* sempre manter backup recente antes de migration sensível;
* nunca confiar apenas na existência do arquivo de backup;
* registrar data e motivo de restores;
* validar aplicação depois do restore;
* testar restaurabilidade periodicamente.

---

## 17. Critério de Sucesso

O processo de backup e restore da v1 será considerado adequado quando:

* backups diários estiverem sendo gerados;
* houver retenção mínima definida;
* o procedimento de restore estiver documentado;
* a equipe conseguir distinguir dados reconstruíveis de dados que exigem backup;
* houver validação real do ambiente após restauração.

# ADR — Learning in Public na v1

## Status

Aceita

## Contexto

O portfólio profissional terá um bloco chamado **Learning in Public** na Home, com a função de exibir evidências curtas de aprendizado técnico derivadas de trabalho real.

O objetivo não é criar um feed social nem um recurso promocional. O objetivo é transformar mudanças técnicas reais em sinais públicos de evolução, execução e repertório de engenharia.

A funcionalidade será alimentada a partir de pull requests merged em um ou poucos repositórios configurados. Esses eventos passarão por processamento controlado para gerar um resumo curto, uma categoria técnica e um link para a origem.

A decisão principal necessária é definir como essa funcionalidade será implementada na v1 sem inflar escopo, sem acoplamento frágil ao app principal e sem depender de operação manual excessiva.

---

## Decisão

A v1 do Learning in Public seguirá as seguintes regras:

* a origem serão apenas **pull requests merged**;
* a funcionalidade começará com **um ou poucos repositórios**;
* o processamento ocorrerá por **rotina agendada**;
* o bloco exibirá **resumo curto + categoria técnica + link**;
* os eventos serão persistidos em **PostgreSQL**;
* haverá opção de **publicação automática ou revisão manual** por configuração;
* o processamento será feito em **worker separado** da aplicação principal.

---

## Motivação

### 1. Foco em eventos consolidados

Usar apenas PRs merged reduz ruído e evita transformar rascunhos, mudanças parciais ou experimentos descartados em evidência pública.

### 2. Escopo controlado

Começar com poucos repositórios limita complexidade, facilita validação e melhora a qualidade editorial dos eventos exibidos.

### 3. Desacoplamento operacional

Separar o processamento em worker evita que a Home dependa em tempo real de GitHub ou de chamadas a LLM.

### 4. Persistência rastreável

Persistir os eventos no banco permite:

* evitar duplicidade;
* controlar status;
* revisar itens;
* ordenar exibição;
* registrar falhas.

### 5. Compatibilidade com a proposta editorial

O bloco deve transmitir engenharia em público, não automação ornamental. O resumo curto e categorizado preserva sobriedade e utilidade.

---

## Alternativas consideradas

## Alternativa A — Ler PRs em tempo real no app

### Descrição

A aplicação consultaria o GitHub diretamente em runtime para montar o bloco da Home.

### Motivos para rejeição

* acoplamento forte entre renderização pública e origem externa;
* maior risco de latência e falhas em runtime;
* dificuldade maior para observabilidade e troubleshooting;
* ausência de controle editorial e persistência local.

---

## Alternativa B — Processar commits em vez de PRs

### Descrição

Usar commits como fonte primária do Learning in Public.

### Motivos para rejeição

* commits podem ser muito granulares, ruidosos ou pouco interpretáveis em público;
* menor clareza editorial;
* maior risco de gerar cards fracos ou repetitivos.

---

## Alternativa C — Publicação 100% manual

### Descrição

Ler PRs e transformar tudo manualmente em conteúdo.

### Motivos para rejeição

* reduz o caráter de evidência viva;
* aumenta operação manual;
* compromete a proposta de automação contínua;
* piora escalabilidade da feature.

---

## Alternativa D — Publicação 100% automática sem revisão opcional

### Descrição

Todo item processado seria publicado diretamente sem possibilidade de controle.

### Motivos para rejeição

* risco editorial maior na v1;
* risco de publicar item ruim, ambíguo ou pouco representativo;
* reduz segurança operacional na fase inicial.

---

## Consequências da decisão

### Positivas

* baixa complexidade inicial relativa;
* melhor resiliência da Home;
* controle editorial suficiente para v1;
* rastreabilidade operacional;
* boa aderência à narrativa de portfólio técnico.

### Negativas

* exige worker separado;
* exige modelagem e persistência específicas;
* exige integração com GitHub e provedor LLM;
* aumenta um pouco a superfície operacional da aplicação.

---

## Desenho operacional da solução

O fluxo da v1 será:

1. rotina agendada aciona o worker;
2. o worker consulta PRs merged nos repositórios configurados;
3. para cada item elegível, verifica se já foi processado;
4. prepara payload controlado com dados relevantes;
5. chama componente de enriquecimento para gerar resumo curto e categoria técnica;
6. persiste o evento no banco com status adequado;
7. a Home lê apenas eventos publicados.

### Regra crítica

A Home nunca deve depender de chamada em tempo real ao GitHub ou à LLM para renderizar o bloco.

---

## Status operacionais do evento

Os eventos do Learning in Public devem suportar ao menos:

* `pending`
* `published`
* `hidden`
* `discarded`
* `failed`

### Motivo

* permitir revisão opcional;
* registrar falha sem perder rastreabilidade;
* controlar exibição pública.

---

## Publicação automática vs revisão manual

A v1 terá um modo configurável:

* publicação automática ativada; ou
* revisão manual antes da publicação.

### Regra

Essa decisão deve ser controlada por variável de ambiente ou configuração equivalente.

### Motivo

Permitir começar com maior controle e liberar automação total depois, sem redesenhar a arquitetura.

---

## Restrições da v1

Na primeira versão, o Learning in Public:

* não terá workflow editorial complexo;
* não processará múltiplas fontes além dos PRs definidos;
* não terá painel administrativo completo;
* não dependerá de streaming ou atualização em tempo real;
* não usará taxonomia avançada.

---

## Riscos aceitos

* dependência de API externa do GitHub;
* dependência de LLM para enriquecimento do resumo;
* necessidade de sanitização e controle do payload enviado;
* necessidade de observar falhas do worker;
* possibilidade de qualidade desigual entre eventos até ajustes finos de prompt e regra editorial.

---

## Medidas de mitigação

* processar apenas PRs merged;
* limitar escopo inicial a poucos repositórios;
* persistir external_id único;
* registrar falhas de processamento;
* permitir revisão manual;
* manter worker separado;
* usar logs estruturados e métricas mínimas.

---

## Resultado esperado

A funcionalidade será considerada bem implementada na v1 quando:

* exibir apenas eventos publicados;
* evitar duplicidade;
* manter o app principal desacoplado do processamento;
* permitir operação agendada previsível;
* gerar cards curtos, claros e tecnicamente úteis;
* reforçar a proposta do portfólio como evidência de execução real.

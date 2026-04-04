---
title: "Nexo 360"
description: "Plataforma multi-agente para PMEs com arquitetura hexagonal e multi-tenant."
slug: "nexo360"
featured: true
order: 1
tags: ["Python", "FastAPI", "Hexagonal", "IA"]
---

# Nexo 360 — Plataforma Multi-Agente

[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688.svg)](https://fastapi.tiangolo.com)
[![Architecture: Hexagonal](https://img.shields.io/badge/Architecture-Hexagonal-blueviolet.svg)]()
[![Multi-tenant](https://img.shields.io/badge/Multi--tenant-Isolamento_Total-orange.svg)]()

A Nexo 360 é uma plataforma de agentes de IA especializados para PMEs brasileiras. Cada agente resolve um problema de negócio específico, conversa com o gestor pelo WhatsApp e pela interface web, aprende com o uso e se torna mais preciso ao longo do tempo.

O produto principal é o **Nexo 360**, que unifica os 5 agentes especializados em uma única interface com orquestração inteligente.

┌──────────────────────────────────────────────────────────────────┐
│                         NEXO 360                                 │
│    (orquestrador \+ dashboard unificado \+ consultoria A++)        │
└───────┬───────┬──────────┬───────────┬──────────────────────────┘
        │       │          │           │           │
     Growth  Finance   Insights    Talent       Connect
  (mercado) (financ.) (projetos)   (RH)    (atendimento)

## Mapa de Responsabilidades**

| Funcionalidade | Growth | Finance | Insights | Talent | Conect | 360 |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Análise de carteira de clientes | ✅ |  |  |  |  | ✅ |
| Pesquisa de mercado / notícias do setor | ✅ |  |  |  |  | ✅ |
| Conciliação financeira |  | ✅ |  |  |  | ✅ |
| Fluxo de caixa / DRE |  | ✅ |  |  |  | ✅ |
| Alertas de vencimento financeiro |  | ✅ |  |  |  | ✅ |
| Planos de ação (5W2H, SWOT) |  |  | ✅ |  |  | ✅ |
| Gestão de projetos / Kanban / sprints |  |  | ✅ |  |  | ✅ |
| Alertas de prazo de projetos |  |  | ✅ |  |  | ✅ |
| Integração Google Calendar |  |  | ✅ |  |  | ✅ |
| Processo seletivo / vagas |  |  |  | ✅ |  | ✅ |
| Materiais de treinamento T\&D |  |  |  | ✅ |  | ✅ |
| Relatórios de RH (turnover, headcount) |  |  |  | ✅ |  | ✅ |
| Chatbot atendimento (cliente final) |  |  |  |  | ✅ | ✅ |
| Relatórios de atendimento ao cliente |  |  |  |  | ✅ | ✅ |
| Dashboard unificado 360 |  |  |  |  |  | ✅ |
| Consultoria proativa integrada |  |  |  |  |  | ✅ |
| Chat com gestor via WhatsApp | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Mensagem de bom dia às 08:00 | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Memória persistente | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Hierarquia de acesso por nível | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Objetivo


---

## Requisitos

- Python 3.11+
- Infraestrutura compartilhada ativa (ver seção Infra)
- Docker para dependências externas (PostgreSQL, Redis, ChromaDB, etc.)

---

## Instalação e Uso

1. Clone o repositório e crie o ambiente virtual:
   ```bash
   git clone <url>
   cd nexo-basis
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   pip install -e .
   ```
2. Configure as variáveis de ambiente:
   ```bash
   cp config/.env.example config/.env
   # Edite conforme necessário
   ```
3. Verifique a infraestrutura compartilhada:
   ```bash
   cd ~/infra
   docker compose ps
   ```
4. Execute as migrations em ordem numérica:
   ```bash
   psql -h localhost -p 5432 -U $POSTGRES_USER -d agentes_nexobasis -f migrations/002_multi_agent_users.sql
   # Continue para as próximas migrations conforme necessário
   ```
5. Inicie o servidor:
   ```bash
   uvicorn src.adapters.driving.api.main:app --reload --port 8080
   # Ou via Docker:
   docker compose up -d --no-deps api
   ```

---

## Estrutura de Pastas

- `src/core/`: Domínio puro, sem dependências externas.
- `src/ports/`: Interfaces de entrada e saída (inbound/outbound).
- `src/adapters/`: Implementações de APIs, persistência, integrações externas.
- `migrations/`: Scripts SQL idempotentes.
- `tests/`: Testes unitários, integração e E2E.
- `docs/`: Documentação técnica e operacional.

---

## Segurança

- Autenticação obrigatória via X-Tenant-Key para APIs externas.
- Endpoints internos protegidos por X-Internal-Key.
- Níveis de acesso definidos por perfil de usuário, respeitados em todo o fluxo.

---

## Testes

- Testes unitários: `pytest tests/unit/`
- Testes de integração: `pytest tests/integration/`
- Cobertura: `pytest --cov=src --cov-report=html`
- Tipagem: `mypy src/ --ignore-missing-imports`

---

## Contribuição

- Siga o padrão hexagonal e as regras de arquitetura descritas em `docs/CONTEXT.md`.
- Migrations devem ser sempre SQL puro e idempotentes.
- Nunca insira credenciais diretamente no código.

---

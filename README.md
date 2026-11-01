# AI Engineering Journey

> A practical, documented journey from frontend engineering towards building reliable AI-powered applications and automations.

I'm using this repository to learn by building: understand the concepts, implement small experiments, document what worked, and turn the strongest ideas into complete projects.

## Goals

- Understand how modern LLM-powered applications work.
- Build useful automations with **n8n**, APIs, webhooks, and JavaScript.
- Integrate hosted and, where useful, local language models.
- Learn tool calling, structured outputs, retrieval-augmented generation (RAG), and agent design.
- Build, test, secure, and deploy practical AI-enabled applications.
- Explain the architecture and trade-offs behind each project without relying on generated code alone.

## Starting point

I already have hands-on experience with:

- React, Next.js, TypeScript, JavaScript
- Node.js and REST APIs
- Docker and Redis

I have also been using Claude Code as a development assistant. This journey focuses on the next layer: understanding AI systems and building them responsibly.

## Roadmap

| Phase | Focus | Status |
|---|---|---|
| 0 | Set up the learning system and baseline | In progress |
| 1 | LLM fundamentals and AI application basics | Not started |
| 2 | n8n fundamentals and workflow automation | Not started |
| 3 | LLM integrations, structured output, and tool calling | Not started |
| 4 | RAG and AI agent patterns | Not started |
| 5 | Local models with Ollama and self-hosting | Optional / not started |
| 6 | Build and deploy portfolio projects | Not started |

See [`00-roadmap/roadmap.md`](00-roadmap/roadmap.md) for the detailed plan and [`00-roadmap/progress.md`](00-roadmap/progress.md) for the live checklist.

## Repository structure

```text
00-roadmap/          Goals, schedule, progress and decisions
01-llm-fundamentals/ LLM concepts, prompting and model APIs
02-n8n/              n8n concepts, exercises and workflow exports
03-ai-applications/  Structured outputs, tool calling and app patterns
04-rag/              Retrieval, embeddings and evaluation
05-ai-agents/        Agent design, tools, guardrails and evaluation
06-local-models/     Ollama and local model experiments
07-self-hosting/     Docker, deployment, security and operations
08-projects/         End-to-end practical projects
daily-logs/          Dated learning notes and weekly reviews
templates/           Reusable notes and project templates
```

## Learning principles

1. **Build, don't just watch.** Every major topic should produce a small working experiment.
2. **Understand the data flow.** Be able to explain inputs, outputs, state, errors, retries, and security.
3. **Verify AI output.** Treat model responses as untrusted until validated.
4. **Keep secrets out of Git.** Use environment variables and commit only `.env.example` files with placeholders.
5. **Prefer reliable workflows.** Use deterministic code for deterministic tasks; use an LLM only where language understanding or generation adds value.
6. **Record failures.** A useful debugging note is part of the learning.
7. **Evaluate projects.** Include test cases, limitations, and known failure modes.

## Projects (planned)

| Project | What it should demonstrate | Status |
|---|---|---|
| Webhook-to-API workflow | n8n triggers, HTTP requests, JSON mapping, error handling | Planned |
| AI email triage assistant | Classification, summaries, human approval before sending | Planned |
| Personal knowledge assistant | Retrieval, citations, access control and evaluation | Planned |
| AI support assistant | RAG, tool use, escalation and guardrails | Planned |

Projects will be marked complete only after a working demo, setup instructions, sample inputs/outputs, and limitations are documented.

## How to use this repository

- Add concept notes under the relevant topic folder.
- Export n8n workflows into `02-n8n/workflows/` after removing credentials and private data.
- Add a dated entry under `daily-logs/`.
- Update the progress tracker when a skill has been practised, not merely watched.
- Give each substantial project its own folder under `08-projects/`.

## Useful official resources

- [n8n documentation](https://docs.n8n.io/)
- [n8n AI documentation](https://docs.n8n.io/advanced-ai/)
- [Anthropic documentation](https://docs.anthropic.com/)
- [OpenAI API documentation](https://platform.openai.com/docs/)
- [Ollama documentation](https://docs.ollama.com/)
- [Docker documentation](https://docs.docker.com/)

## Progress updates

This repository is a learning journal, not a claim of expertise. Notes and project status reflect what has actually been completed.

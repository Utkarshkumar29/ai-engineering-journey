# AI Engineering Learning Roadmap

**Target duration:** 90 days (flexible)  
**Suggested pace:** 1–1.5 hours on most days  
**Approach:** Learn a concept, build a small exercise, document it, then apply it in a project.

This is a sequence, not a deadline. Extend a phase if the fundamentals are not clear.

## Phase 0 — Setup and baseline (Days 1–3)

- [ ] Create and configure this GitHub repository.
- [ ] Record current skills and learning goals.
- [ ] Set up a local development environment.
- [ ] Learn how to export and version-control n8n workflows safely.
- [ ] Create a weekly review habit.

**Exit criteria:** Repository is usable; first learning log is committed; environment setup is documented.

## Phase 1 — LLM fundamentals (Days 4–14)

Topics:
- [ ] What tokens, context windows, inference, and model limits mean.
- [ ] System/developer/user instructions and message roles.
- [ ] Temperature and sampling at a conceptual level.
- [ ] Hallucinations, grounding, and verification.
- [ ] Prompt design: context, task, constraints, examples, output schema.
- [ ] Hosted model APIs, authentication, rate limits, and cost basics.
- [ ] Structured outputs and schema validation.

Exercises:
- [ ] Call one LLM API from a small Node.js script.
- [ ] Ask for JSON output and validate it with a schema.
- [ ] Compare responses on a small set of repeatable test prompts.
- [ ] Document where the model fails and how to handle it.

**Exit criteria:** Can explain a basic LLM request/response cycle and build a small API integration with validation and error handling.

## Phase 2 — n8n and workflow automation (Days 15–30)

Topics:
- [ ] Workflows, nodes, connections, executions, and credentials.
- [ ] Manual, schedule, and webhook triggers.
- [ ] HTTP Request node and REST API basics.
- [ ] JSON mapping and expressions.
- [ ] IF, Switch, Merge, and looping/batching patterns.
- [ ] JavaScript Code node (use only when built-in nodes are insufficient).
- [ ] Error handling, retries, timeouts, and idempotency.
- [ ] Workflow export/import and credential hygiene.

Exercises:
- [ ] Build a webhook that validates incoming JSON.
- [ ] Call a public API and transform its response.
- [ ] Add conditional routing.
- [ ] Handle an API failure and record a useful error.
- [ ] Export the workflow with no credentials or private sample data.

**Exit criteria:** Can build and explain a multi-step workflow, test its failure path, and safely version its export.

## Phase 3 — AI application patterns (Days 31–45)

- [ ] Connect an LLM to an application or n8n workflow.
- [ ] Use structured output and validate it.
- [ ] Understand tool/function calling.
- [ ] Keep secrets server-side.
- [ ] Add human approval for consequential actions.
- [ ] Track latency, token usage, failures, and cost.
- [ ] Build a small AI email triage prototype that drafts but does not automatically send.

**Exit criteria:** A working AI-enabled workflow with input validation, output validation, logging, and a human approval step.

## Phase 4 — RAG (Days 46–60)

- [ ] Understand embeddings and semantic similarity.
- [ ] Ingest and chunk a small set of documents.
- [ ] Store and retrieve relevant chunks.
- [ ] Generate answers grounded in retrieved context.
- [ ] Include source references in answers.
- [ ] Test retrieval quality with a small question set.
- [ ] Consider access control, document freshness, and deletion.

**Exit criteria:** A small knowledge assistant that answers from a known document set and can say when the sources do not contain an answer.

## Phase 5 — Agent design (Days 61–72)

- [ ] Understand the difference between a fixed workflow and an agent loop.
- [ ] Give an agent a small, explicit set of tools.
- [ ] Validate tool inputs and outputs.
- [ ] Add limits on steps, time, and cost.
- [ ] Require approval before external or destructive actions.
- [ ] Test incorrect tool calls and ambiguous requests.
- [ ] Document when a deterministic workflow is safer than an agent.

**Exit criteria:** A constrained agent demo with tool allow-listing, limits, logs, and human approval where needed.

## Phase 6 — Local models and deployment (Days 73–82)

- [ ] Learn what Ollama does and what hardware affects local inference.
- [ ] Run a suitable local model if the machine can support it.
- [ ] Compare local and hosted model quality, speed, and cost for one task.
- [ ] Run n8n using Docker or Docker Compose.
- [ ] Configure persistent storage and environment variables.
- [ ] Document backups, upgrades, network exposure, and authentication.
- [ ] Review n8n's current licence before commercial use.

**Exit criteria:** A documented local experiment and a secure, reproducible self-hosted setup. Local models are optional; don't buy hardware just to complete this phase.

## Phase 7 — Portfolio projects (Days 83–90 and beyond)

Choose 2–3 projects and finish them properly:
- [ ] AI email triage assistant (draft + approval, not unattended sending).
- [ ] Personal knowledge assistant (RAG + source references).
- [ ] Customer support assistant (retrieval + escalation).
- [ ] Personal assistant with a small, permissioned tool set.

Each project should include:
- Problem statement and intended user.
- Architecture diagram and data flow.
- Setup instructions and environment variables.
- Screenshots or short demo.
- Test cases and evaluation notes.
- Security and privacy considerations.
- Known limitations and next steps.

## Weekly review

At the end of each week, answer:
1. What did I build?
2. What can I now explain without notes?
3. What broke, and how did I debug it?
4. What should I revisit?
5. What is the smallest useful next step?

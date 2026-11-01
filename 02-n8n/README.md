# n8n

Practical notes and version-controlled workflow exports for learning n8n.

## Learning order

1. Editor, workflows, nodes, connections, executions.
2. Triggers: manual, schedule, webhook.
3. HTTP Request and REST APIs.
4. Expressions and JSON mapping.
5. Conditions, branching, and merging.
6. JavaScript Code node.
7. Error handling, retries, and idempotency.
8. AI integrations and approval steps.

## Workflow export rules

- Export workflows as JSON into `workflows/`.
- Remove credentials, tokens, personal data, and private URLs before committing.
- Use fake/sample payloads in documentation.
- Keep credentials in n8n's credential store or environment variables.
- Document the n8n version and any required environment variables.
- Never commit production workflow exports without reviewing them for secrets.

## Workflows

| Workflow | Purpose | Status |
|---|---|---|
| `webhook-to-api.json` | Receive, validate, and transform a webhook payload | Planned |

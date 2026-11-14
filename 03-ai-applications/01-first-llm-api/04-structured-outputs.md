# Lesson 4 — Structured Outputs

## Learning goals

- Understand why applications need structured LLM responses.
- Learn the basics of JSON Schema.
- Understand `properties`, `required`, `additionalProperties`, arrays, and nested objects.
- Distinguish the prompt input from the output schema.
- Configure structured outputs with Gemini's Interactions API.

## 1. Why structured outputs?

An LLM can answer in natural language, but application code often needs predictable data.

For example, a resume extractor might need:

```json
{
  "name": "Rahul",
  "age": 25,
  "role": "Frontend Developer",
  "experience": 2,
  "skills": ["React", "Next.js", "JavaScript", "Tailwind CSS"]
}
```

Structured responses give the application named fields it can work with instead of requiring it to interpret a paragraph.

## 2. JSON Schema fundamentals

JSON Schema describes the expected structure and constraints of JSON data.

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" }
  },
  "required": ["name", "age"],
  "additionalProperties": false
}
```

### `properties`

Defines the fields allowed in an object, along with their types and constraints.

### `required`

Defines which fields declared in `properties` must be present. `required` is a subset of `properties`.

A property can be allowed without being mandatory:

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" }
  },
  "required": ["name"],
  "additionalProperties": false
}
```

Here, `name` is required and `age` is optional.

### `additionalProperties`

`"additionalProperties": false` prevents fields not declared in `properties` from appearing.

For example, this object fails the schema above because `city` is not declared:

```json
{
  "name": "Utkarsh",
  "age": 24,
  "city": "Delhi"
}
```

Valid JSON does not automatically mean valid output against a particular schema.

### Arrays and `items`

Use `items` to define the type or structure of each array element.

Array of strings:

```json
{
  "type": "array",
  "items": { "type": "string" }
}
```

Array of objects:

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "quantity": { "type": "string" }
    },
    "required": ["name", "quantity"],
    "additionalProperties": false
  }
}
```

## 3. JSON mode vs. structured outputs

- **JSON mode** asks the model to return valid JSON.
- **Structured outputs** use a schema to specify the expected fields and structure.

JSON can still contain missing fields, unexpected fields, or values of the wrong type. A schema provides more precise structural constraints.

## 4. Prompt input vs. output schema

The prompt and schema have different jobs:

- **Input prompt:** tells the model what information to process and what task to perform.
- **Output schema:** describes the structure the response should follow.

For a resume extractor, the prompt might ask the model to extract a person's name, email, age, and skills from a resume. The schema separately defines those fields and their types.

The schema is sent as a separate configuration field in the API request; it is not simply appended to the prompt text.

## 5. Practical exercise — Recipe extractor

The practical task was to extract a cookie recipe from a text description.

The schema describes:

- `recipe_name`: string.
- `prep_time_minutes`: integer, optional.
- `ingredients`: array of objects. Each ingredient has a string `name` and string `quantity`.
- `instructions`: array of strings.
- No undeclared fields allowed at the root or inside ingredient objects.

### Recipe JSON Schema

```js
const recipeJsonSchema = {
  type: "object",
  properties: {
    recipe_name: {
      type: "string",
      description: "The name of the recipe."
    },
    prep_time_minutes: {
      type: "integer",
      description: "Preparation time in minutes."
    },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the ingredient."
          },
          quantity: {
            type: "string",
            description: "Quantity including units."
          }
        },
        required: ["name", "quantity"],
        additionalProperties: false
      }
    },
    instructions: {
      type: "array",
      items: {
        type: "string"
      }
    }
  },
  required: ["recipe_name", "ingredients", "instructions"],
  additionalProperties: false
};
```

`prep_time_minutes` is optional because it is not listed in `required`. Both ingredient fields are required for every ingredient object.

## 6. Sending structured-output configuration to Gemini

The project uses Node.js native `fetch()` and Gemini's Interactions API.

Endpoint:

```text
https://generativelanguage.googleapis.com/v1beta/interactions
```

The request body separates the prompt from the output format:

```js
body: JSON.stringify({
  model: "gemini-3.8-flash",
  input: prompt,
  response_format: {
    type: "text",
    mime_type: "application/json",
    schema: recipeJsonSchema
  }
})
```

Request headers:

```js
headers: {
  "x-goog-api-key": apiKey,
  "Content-Type": "application/json"
}
```

The API key is loaded from the environment:

```js
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;
```

Keep the real key in `.env`, keep `.env` in `.gitignore`, and use only a placeholder in `.env.example`. Never log or share the actual key.

## 7. Handling API errors

A request can fail even when the JavaScript and schema are correct.

During this lesson, Gemini returned:

```json
{
  "error": {
    "message": "gemini-3.8-flash is currently experiencing high demand, spikes in demand are usually temporary. Please try again later.",
    "code": "service_unavailable"
  }
}
```

This was a temporary service-availability response. The same model had worked for an earlier request.

The code checks the HTTP response before treating the body as successful:

```js
const data = await response.json();

if (!response.ok) {
  console.error("Gemini API Error:", data);

  if (response.status === 503) {
    console.log("Gemini is temporarily unavailable. Try again later.");
  }

  return;
}
```

A `503` service-unavailable response is different from a schema or JavaScript error. Production applications should handle transient failures deliberately, for example with bounded retries and backoff.

## 8. Next step: consume the structured response

Logging the entire response is useful while exploring its shape:

```js
console.log("Gemini Response:", data);
```

Application code should eventually extract the generated JSON text and parse it with `JSON.parse()` before using it.

The exact extraction path should be based on the actual response returned by the API. Do not assume the response shape without inspecting it.

Conceptually:

1. Find the model-output content in the response.
2. Extract its text.
3. Parse the JSON text with `JSON.parse()`.
4. Handle parsing errors.
5. Use the resulting object in the application.

This extraction and parsing step is the next practical task; it has not yet been completed.

## 9. Key takeaways

- Structured outputs make LLM responses easier for application code to consume.
- JSON Schema defines the expected data structure and constraints.
- `properties` declares allowed fields; `required` declares mandatory fields.
- `additionalProperties: false` rejects undeclared object fields.
- `items` defines the contents of an array.
- The prompt describes the task; the schema describes the expected response shape.
- In the Gemini Interactions API request, the prompt is sent in `input` and the schema is supplied through `response_format`.
- A correct request can still encounter temporary service errors.
- Inspect the actual response shape before extracting and parsing its output.

## 10. Revision questions

1. What is the difference between JSON mode and structured outputs?
2. What is the relationship between `properties` and `required`?
3. What does `additionalProperties: false` prevent?
4. How do you define an array of strings in JSON Schema?
5. How do you define an array of objects?
6. What is the difference between the prompt input and the output schema?
7. Why should an application handle API errors even when its request is correct?
8. Why should you inspect the response before deciding how to extract its generated JSON?

## Lesson status

- [x] Understand why structured outputs are useful.
- [x] Learn JSON Schema fundamentals.
- [x] Explain `properties`, `required`, and `additionalProperties`.
- [x] Define arrays and nested objects.
- [x] Distinguish prompt input from output schema.
- [x] Add a schema to a Gemini Interactions API request.
- [x] Identify a temporary `503` service-availability response.
- [ ] Successfully receive the recipe using the structured-output request.
- [ ] Extract and parse the generated JSON into a JavaScript object.

# Lesson 3 --- Working with LLM APIs

## Learning objective

Understand how a Node.js application communicates with an LLM through an
HTTP API, manages API credentials, handles responses and errors, and
measures usage and latency.

## Project

`03-ai-applications/01-first-llm-api/`

The project uses Node.js, native `fetch()`, and environment variables.
The implementation started with the OpenAI Responses API, then moved to
Google's Gemini Interactions API because the OpenAI API account had no
remaining credits.

## 1. What is an API?

An API is a contract that allows two software systems to communicate.

For an HTTP API request, the important parts are:

-   **URL:** the endpoint receiving the request.
-   **Method:** the operation, such as `GET` or `POST`.
-   **Headers:** metadata and authentication information.
-   **Body:** the data sent to the server.

For an LLM request, the body commonly contains a model identifier and
the user's input.

## 2. Calling an LLM API with `fetch()`

Node.js provides `fetch()`, which can send HTTP requests without
installing an HTTP client library.

A typical request follows this sequence:

1.  Call the provider's endpoint.
2.  Set the HTTP method.
3.  Add authentication and content-type headers.
4.  Serialize the request body with `JSON.stringify()`.
5.  Read the response body, usually with `response.json()`.

The `Response` object returned by `fetch()` contains metadata such as
the HTTP status and headers. The JSON payload is read separately with
`response.json()`.

## 3. Environment variables and API keys

Secrets such as API keys should not be hardcoded into source files or
printed in terminal logs.

The project uses `dotenv` to load variables from `.env`.

Example `.env`:

``` env
GEMINI_API_KEY=your_api_key_here
```

Load the file at the top of the entry point:

``` js
import "dotenv/config";
```

Read the variable with:

``` js
process.env.GEMINI_API_KEY
```

Verify that a key exists without exposing it:

``` js
console.log("API key loaded:", Boolean(process.env.GEMINI_API_KEY));
```

Important:

-   Keep `.env` in `.gitignore`.
-   Commit `.env.example` with placeholder values, never real
    credentials.
-   Never log or share an API key.
-   If a key is exposed, revoke it and generate a replacement.
-   `dotenv` resolves `.env` relative to the process's current working
    directory by default. Run the project from its root directory, where
    `.env` is located.

## 4. OpenAI API attempt and provider migration

The first attempt used OpenAI's Responses API:

`https://api.openai.com/v1/responses`

The request reached OpenAI, but the API returned:

-   HTTP status: `429 Too Many Requests`
-   Error type: `insufficient_quota`
-   Error code: `credit_balance_exhausted`

This was an account-credit issue, not a JavaScript or network failure.
ChatGPT subscriptions and API billing are separate.

To continue learning without purchasing OpenAI API credits, the project
was switched to Google Gemini.

## 5. Gemini Interactions API

The Gemini documentation used for this project recommends the
Interactions API for new projects.

Endpoint:

`https://generativelanguage.googleapis.com/v1beta/interactions`

Method: `POST`

Headers:

``` js
{
  "x-goog-api-key": process.env.GEMINI_API_KEY,
  "Content-Type": "application/json"
}
```

Example request body:

``` js
{
  model: "gemini-3.8-flash",
  input: "Write a one-sentence bedtime story about a unicorn."
}
```

Notice that Gemini uses the `x-goog-api-key` header. Do not use OpenAI's
`Authorization: Bearer ...` header for this native Gemini REST request.

The request format and response format are provider-specific. Do not
assume that two providers use identical endpoints, headers, request
bodies, or response structures.

## 6. Handling HTTP errors

`fetch()` does not automatically throw an exception for HTTP error
statuses such as `400`, `401`, `429`, or `500`.

Check `response.ok`:

``` js
const response = await fetch(url, options);
const data = await response.json();

if (!response.ok) {
  console.error("API error:", data);
  return;
}
```

Useful status meanings:

  Status   General meaning
  -------- -----------------------------------
  `200`    Request succeeded
  `400`    Invalid request or payload
  `401`    Missing or invalid authentication
  `403`    Permission or access problem
  `429`    Rate limit or quota problem
  `500`    Server-side error

The response body usually contains a more specific error message and
code. Inspect it instead of guessing from the HTTP status alone.

## 7. Standalone function versus Express handler

During the first test, the function was declared with Express
parameters:

``` js
const apiCallHandler = async (req, res) => {
  // ...
};
```

But it was invoked directly:

``` js
apiCallHandler();
```

That call does not provide `req` or `res`, so both values are
`undefined`. Calling `res.status()` then causes another error and can
hide the original API error.

For a standalone Node.js script, use a function with no Express
parameters:

``` js
const apiCallHandler = async () => {
  // make request
  // log result or error
};

apiCallHandler();
```

Express will be introduced later. When the function is registered as an
Express route handler, Express supplies `req` and `res`.

## 8. Testing with Postman

Postman can test the provider API independently of the Node.js code.
This helps separate API configuration problems from application-code
problems.

For the Gemini Interactions API:

-   Method: `POST`
-   URL: `https://generativelanguage.googleapis.com/v1beta/interactions`
-   Headers:
    -   `x-goog-api-key`: your Gemini API key
    -   `Content-Type`: `application/json`
-   Body: select **raw**, choose **JSON**, and send:

``` json
{
  "model": "gemini-3.8-flash",
  "input": "Write a one-sentence bedtime story about a unicorn."
}
```

A `400` error saying the JSON payload is invalid can occur if the body
is sent as `form-data` instead of raw JSON.

Never include the API key in screenshots or shared request exports.

## 9. Understanding the successful Gemini response

The successful response observed in this lesson included fields such as:

-   `id`: identifier for the interaction.
-   `status`: completion status, observed as `completed`.
-   `model`: model used for the interaction.
-   `steps`: sequence of interaction steps, including a `model_output`
    step.
-   `usage`: token usage information.

The observed usage object included:

-   `total_tokens`
-   `total_input_tokens`
-   `total_output_tokens`
-   `total_thought_tokens`
-   `total_tool_use_tokens`
-   `total_cached_tokens`

The response's model output is inside the `model_output` step. Do not
assume that the Gemini Interactions API response has the same shape as
OpenAI's Responses API.

Example extraction pattern for a text output step:

``` js
const outputStep = data.steps.find(
  (step) => step.type === "model_output"
);

const generatedText = outputStep?.content
  ?.filter((item) => item.type === "text")
  .map((item) => item.text)
  .join("");

console.log("Generated text:", generatedText);
```

The actual content item shape should be checked against the response
returned by the API.

## 10. Measuring latency and understanding usage

Measure the time around the request:

``` js
const startTime = performance.now();

const response = await fetch(url, options);
const data = await response.json();

const elapsedSeconds = (performance.now() - startTime) / 1000;

console.log("Response time:", elapsedSeconds.toFixed(2), "seconds");
```

Latency can be affected by network conditions, provider load, model
choice, output length, and reasoning/thinking settings.

The successful response in this lesson showed substantially more thought
tokens than final output tokens. This prompted an experiment with a
lower thinking level. Treat latency as something to measure rather than
assuming a model is slow based on one request.

## 11. Key takeaways

-   An LLM API call is an HTTP request.
-   `fetch()` returns a `Response` object; parse its body separately.
-   `response.ok` is useful for handling non-success HTTP statuses.
-   API keys belong in environment variables, not source code.
-   Provider APIs differ in endpoint, authentication, request schema,
    and response schema.
-   A standalone function should not use Express's `req` and `res`
    unless it is actually invoked by Express.
-   Postman helps isolate API configuration from application-code bugs.
-   Inspect token usage and measure latency instead of logging enormous
    response objects.
-   Never expose API keys in terminal output, screenshots, chats, or Git
    commits.

## Completion status

**Completed in practice:**

-   Created a Node.js project using native `fetch()`.
-   Configured environment variables with `dotenv`.
-   Diagnosed an OpenAI API quota error.
-   Switched to the Gemini Interactions API.
-   Tested the Gemini request successfully.
-   Inspected the interaction response and token usage.

**Still worth finishing/refining:**

-   Keep the final standalone script clean and avoid Express `req`/`res`
    until the Express lesson.
-   Extract and display only the model's text output.
-   Measure request latency and compare thinking settings.
-   Add robust handling for malformed or unexpected response shapes.
-   Commit the final lesson notes and working code to GitHub.

## Quick revision questions

1.  What are the four main parts of an HTTP request?
2.  Why do we use `JSON.stringify()` in the request body?
3.  What is the difference between `response.ok` and `response.json()`?
4.  Why should API keys be stored in `.env`?
5.  Why did calling `apiCallHandler()` without arguments cause
    `res.status()` to fail?
6.  Which authentication header does the native Gemini REST API use?
7.  Why should you inspect the response body when an API request fails?
8.  What is the difference between input tokens, output tokens, and
    thought tokens?
9.  Why is it useful to test an API request in Postman?
10. Why should latency be measured instead of judged from a single
    request?

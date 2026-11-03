# Understanding Large Language Models (LLMs)

> **AI Engineering Journey --- Phase 1: LLM Fundamentals**\
> **Lesson 1 --- Day 1**

## 1. What is an LLM?

LLM stands for **Large Language Model**.

An LLM is an AI model trained on large amounts of data, including text
and, depending on the model, code or other types of data. During
training, it learns patterns and relationships in that data. It can then
use those learned patterns and the context provided in a request to
generate an output.

A simple way to think about it:

1.  An application sends input to the model.
2.  The model processes the input in the context of what it has been
    given.
3.  The model generates an output.

Examples of LLMs include GPT, Claude, Gemini, and Llama.

**My understanding:** An LLM generates output based on the input and the
context available to it. It is trained on large amounts of data, which
helps it learn patterns used when generating responses.

## 2. How does next-token prediction work?

An LLM generates text step by step. It uses the tokens already in the
input and the patterns it learned during training to estimate which
token is likely to come next.

For example:

``` text
Input: The sun rises in the ...

Possible next token: east
```

The model generates a token, adds it to the sequence, and then predicts
the next token. This process continues until the model reaches a
stopping condition, such as an end-of-response token or an output limit.

The model does not simply choose a completely random word. It assigns
probabilities to possible next tokens. Depending on the generation
settings, it may select a likely token or allow more variation.

**My initial understanding:** The next token comes from the input.

**Refined understanding:** The next token is predicted using the
existing input/context and patterns learned during training. The model
estimates probabilities for possible next tokens and generates the
response one token at a time.

## 3. What are tokens?

Tokens are the units of text that a language model processes. A token
may be:

-   A complete word, such as `hello`
-   Part of a word, such as `gam` or `mer`
-   Punctuation, such as `.`
-   Another piece of text, depending on the tokenizer

For example, the sentence `I love programming.` may be split into tokens
similar to:

``` text
["I", " love", " programming", "."]
```

This is only an illustration. Actual tokenization depends on the model
and its tokenizer.

Tokens matter because they affect:

-   API usage and cost
-   How much input and output can fit in a context window
-   Response latency

**My understanding:** Tokens are small chunks of text. They are not
always complete words; they can also be parts of words or punctuation.

## 4. What is a context window?

A context window is the amount of information a model can process in a
single interaction. It can include the current prompt, relevant
conversation history, instructions, and other information supplied to
the model.

For example, a chat application may send earlier messages along with a
new question so the model can use that conversation history when
responding.

A model cannot necessarily process an unlimited conversation. If the
relevant information is not included in the current context, the model
may not be able to use it.

### Context window vs. memory

These concepts are related, but they are not the same:

-   **Context window:** The information available to the model in a
    particular interaction.
-   **Memory:** Information an application or system retains and may
    provide to the model in a later interaction.

An LLM does not automatically remember every previous conversation. The
application may need to store conversation history or other information
and send the relevant parts again.

**My initial understanding:** A context window is a limited amount of
data available to the model from the input or previous conversation. The
model may not have the whole conversation available and can only use the
context supplied to it.

**Refined understanding:** The context window is the model's limit for
the information it can process in one interaction. Memory is separate:
an application may retain information and add relevant details to a
future request.

## 5. LLMs vs. traditional programming

  -----------------------------------------------------------------------
  Traditional programming             LLM-based systems
  ----------------------------------- -----------------------------------
  Developers define explicit rules    The model uses patterns learned
  and logic.                          during training.

  Usually produces deterministic      Outputs can vary, depending on the
  results for the same input and      model and generation settings.
  state.                              

  Useful for exact calculations and   Useful for language tasks such as
  clearly defined business rules.     summarising, classifying, and
                                      generating text.

  Can still produce incorrect results Can produce incorrect or fabricated
  because of bugs or bad inputs.      information, sometimes called
                                      hallucinations.
  -----------------------------------------------------------------------

In real applications, both approaches are often used together. For
example, an LLM can understand a customer's question, while backend code
retrieves the invoice and calculates the exact amount.

**My understanding:** LLM outputs can change, while traditional programs
generally follow defined rules. LLMs learn patterns, whereas traditional
programs use explicitly written logic. LLM outputs are less predictable
and can be wrong; traditional code can also be wrong if it contains bugs
or receives incorrect input.

## 6. Key takeaways

The main things I learned in this lesson:

1.  **LLMs:** Models trained on large datasets that can generate
    language based on learned patterns and supplied context.
2.  **Context windows:** Models can only process a limited amount of
    information in a given interaction.
3.  **Tokens:** Text is processed as tokens, which can be words, parts
    of words, or punctuation.
4.  **LLMs vs. traditional programming:** LLMs generate probabilistic
    outputs, while traditional programs generally execute explicitly
    defined logic.

## 7. Questions to revisit

-   How do tokenizers decide where to split text?
-   How do temperature and other generation settings affect token
    selection?
-   What happens when a conversation exceeds the model's context window?
-   How should an application store and retrieve conversation history?

------------------------------------------------------------------------

**Next lesson:** System prompts, user prompts, temperature, and prompt
engineering.

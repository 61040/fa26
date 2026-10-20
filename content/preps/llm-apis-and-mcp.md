---
title: "Prep 7: LLM APIs and MCP"
categories: preps
due_date: 2026-10-22 10:00:00 -0400
order: 7
---

**Due:** Thursday, October 22nd, 10am\
**Submission:** On [Commons](https://class.mit-sdg.dev/)

## Overview

Language models complete text. When an application uses an LLM, its backend sends an HTTP POST request containing text, and the API returns text. Everything else—remembering a conversation, checking a price against the store's database, or putting items in a cart—is handled by code you write around the model.

In this prep, you will call Gemini's API with `curl` for the assistant of an online Halloween candy store. You will:
- send a question and a follow-up, and see how conversation history affects token count;
- request structured output in JSON, and see where its values come from;
- run a short tool loop in TypeScript that lets the model search the store's inventory and update a cart;
- query a public MCP (Model Context Protocol) server to see how tools can be shared across applications.

Plan on about 45 minutes.

<details>
<summary>Note for Windows users</summary>
<p>Run everything in this prep in <a href="https://learn.microsoft.com/en-us/windows/wsl/install">WSL</a>. PowerShell does not support <code>&lt;&lt;'EOF'</code> heredocs and its <code>curl</code> behaves differently.</p>
</details>

## Part 0: Get an API key

1. **Create an API key** in [Google AI Studio](https://aistudio.google.com/apikey). If AI Studio says you do not have permission, sign in with a personal Google account instead of an MIT account.

   <span class="emphasize">**Important:** Treat your API key like a password. Do not commit it to git, do not put it in your submission, and do not share it. If your key leaks, delete it in AI Studio and create a new one.</span>

2. **Store the key in an environment variable.** In your terminal, run these commands and paste your key after the first. Nothing appears on screen while you paste; press Enter when done.

   ```sh
   read -s GEMINI_API_KEY
   export GEMINI_API_KEY
   ```

   If you open a new terminal window later, run these two commands again.

3. **Check that your key works:**

   ```sh
   curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent" \
       -H "x-goog-api-key: $GEMINI_API_KEY" \
       -H 'Content-Type: application/json' \
       -d '{"contents":[{"parts":[{"text":"ping"}]}]}' && echo ""
   ```

   If the response contains `candidates`, your key works. If you see `API_KEY_INVALID` or `unregistered callers`, repeat step 2.

If you cannot create an API key, post on Commons, and course staff will help.

## Part 1: Statelessness and token growth

When a customer chats with the candy store's assistant, the store's backend sends each customer message to Gemini and returns the model's response.

1. **Send an initial message.** A customer says: "I'm looking at the Twix fun size bag."

   ```sh
   curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent" \
       -H "x-goog-api-key: $GEMINI_API_KEY" \
       -H 'Content-Type: application/json' \
       -d @- <<'EOF' && echo ""
   {
     "system_instruction": { "parts": [{ "text": "You are the shopping assistant for an online Halloween candy store. Help customers find candy and manage their cart." }] },
     "contents": [
       { "role": "user", "parts": [{ "text": "I'm looking at the Twix fun size bag." }] }
     ]
   }
   EOF
   ```

   The generated reply is in `candidates[0].content.parts[0].text`. `usageMetadata.promptTokenCount` is the number of tokens you sent.

2. **Send a follow-up alone.** The customer asks: "How many are in it?"

   ```sh
   curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent" \
       -H "x-goog-api-key: $GEMINI_API_KEY" \
       -H 'Content-Type: application/json' \
       -d @- <<'EOF' && echo ""
   {
     "system_instruction": { "parts": [{ "text": "You are the shopping assistant for an online Halloween candy store. Help customers find candy and manage their cart." }] },
     "contents": [
       { "role": "user", "parts": [{ "text": "How many are in it?" }] }
     ]
   }
   EOF
   ```

3. **Send the follow-up with conversation history.** The API server retains no session state between calls. To give the model context, your application must resend the entire conversation on every turn. The `model` turn below is Gemini's reply to step 1 from one of our runs.

   ```sh
   curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent" \
       -H "x-goog-api-key: $GEMINI_API_KEY" \
       -H 'Content-Type: application/json' \
       -d @- <<'EOF' && echo ""
   {
     "system_instruction": { "parts": [{ "text": "You are the shopping assistant for an online Halloween candy store. Help customers find candy and manage their cart." }] },
     "contents": [
       { "role": "user", "parts": [{ "text": "I'm looking at the Twix fun size bag." }] },
       { "role": "model", "parts": [{ "text": "Ooh, excellent choice! You can never go wrong with that classic combination of crunchy cookie, smooth caramel, and rich milk chocolate." }] },
       { "role": "user", "parts": [{ "text": "How many are in it?" }] }
     ]
   }
   EOF
   ```

**Record:**
- What did the model reply to "How many are in it?" when sent alone versus when sent with history?
- Did anything in either request tell the model how many bars are in a bag? Where did the number in the response come from?
- What was `promptTokenCount` for request 1 versus request 3, and why did it increase?

## Part 2: Structured output (shape vs. truth)

The store's frontend displays a product card with a name, a price, and an "Add" button that is disabled when an item is out of stock. The frontend needs structured data to render this card.

Here is the store's current database inventory:

| Item | Size | Price | In stock |
|---|---|---|---|
| Twix | fun size, bag of 20 | $5.49 | 3 bags |
| Kit Kat | fun size, bag of 20 | $5.49 | **0 bags (sold out)** |
| Milky Way | fun size, bag of 20 | $4.99 | 2 bags |

Notice that **Kit Kats are sold out**, and that **none of this inventory appears in the request below**.

The request's `generationConfig.responseFormat` holds a schema, and the API returns JSON that matches it:

```sh
curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d @- <<'EOF' && echo ""
{
  "system_instruction": { "parts": [{ "text": "You are the shopping assistant for an online Halloween candy store. Help customers find candy and manage their cart." }] },
  "contents": [
    { "role": "user", "parts": [{ "text": "I'd like some Kit Kats for my kid's party." }] }
  ],
  "generationConfig": {
    "responseFormat": {
      "text": {
        "mimeType": "APPLICATION_JSON",
        "schema": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "price": { "type": "number" },
            "inStock": { "type": "boolean" }
          },
          "required": ["name", "price", "inStock"]
        }
      }
    }
  }
}
EOF
```

**Record:**
- The JSON returned by the model.
- Compare the `price` and `inStock` the model returned with the Kit Kat row in the table above.
- What does structured output guarantee about the response, and what does it *not* guarantee?

## Part 3: Tool calling and the agent loop

In Part 2, the model hallucinated inventory because it had no access to the store's data. To fix this, we provide **tools**: functions our code defines that the model can request to call.

When tools are declared, the model does not execute code itself. Instead, it responds with a `functionCall` specifying which tool to invoke and what arguments to supply. Our code runs the local function, sends the result back in a `functionResponse`, and repeats the cycle until the model produces a final text answer.

1. **Create `store.ts`.** In an empty folder, create `store.ts`:

   ```sh
   cat <<'EOF' > store.ts
   const URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";

   const apiKey = process.env.GEMINI_API_KEY;
   if (!apiKey) {
     console.error("Error: GEMINI_API_KEY is not set. Run step 2 of Part 0 to set it.");
     process.exit(1);
   }

   const shelf = [
     { item: "Twix", size: "fun size, bag of 20", price: 5.49 },
     { item: "Kit Kat", size: "fun size, bag of 20", price: 5.49 },
     { item: "Milky Way", size: "fun size, bag of 20", price: 4.99 },
   ];
   // Bags in stock. searchCatalog returns only each item's name, size, and price.
   const stock: Record<string, number> = { "Twix": 3, "Kit Kat": 0, "Milky Way": 2 };
   const cart: Record<string, number> = {};

   function searchCatalog(args: { query: string }) {
     const hits = shelf.filter((e) => e.item.toLowerCase().includes(args.query.toLowerCase()));
     return { items: hits.length > 0 ? hits : shelf };
   }

   function addToCart(args: { item: string; quantity: number }) {
     const entry = shelf.find((e) => e.item.toLowerCase() === args.item.toLowerCase());
     if (!entry) return { error: "NO_SUCH_ITEM" };
     if (stock[entry.item] < args.quantity) return { error: "OUT_OF_STOCK", item: entry.item, inStock: stock[entry.item] };
     stock[entry.item] -= args.quantity;
     cart[entry.item] = (cart[entry.item] ?? 0) + args.quantity;
     return { cart };
   }

   const message = process.argv[2] ?? "Add 2 Twix to my cart.";
   const tools: Record<string, (args: any) => object> = { searchCatalog, addToCart };

   const request: any = {
     system_instruction: { parts: [{ text: "You are the shopping assistant for an online Halloween candy store. Help customers find candy and manage their cart." }] },
     contents: [{ role: "user", parts: [{ text: message }] }],
     tools: [{
       functionDeclarations: [
         {
           name: "searchCatalog",
           description: "Searches the store's catalog. Returns matching items with their size and price.",
           parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
         },
         {
           name: "addToCart",
           description: "Adds an item to the customer's cart.",
           parameters: {
             type: "object",
             properties: { item: { type: "string", description: "An item name from searchCatalog" }, quantity: { type: "integer", minimum: 1 } },
             required: ["item", "quantity"],
           },
         },
       ],
     }],
   };

   for (let n = 1; n <= 5; n++) {
     const response = await fetch(URL, {
       method: "POST",
       headers: { "x-goog-api-key": apiKey, "Content-Type": "application/json" },
       body: JSON.stringify(request),
     });
     const reply = await response.json();
     if (reply.error) throw new Error(reply.error.message);

     const turn = reply.candidates[0].content;
     const calls = turn.parts.filter((part: any) => part.functionCall).map((part: any) => part.functionCall);
     if (calls.length === 0) {
       console.log(`Request ${n} → text: ${turn.parts.map((part: any) => part.text ?? "").join("")}`);
       console.log("Cart:", cart);
       break;
     }

     const results = calls.map((call: any) => {
       const result = tools[call.name](call.args);
       console.log(`Request ${n} → call ${call.name}(${JSON.stringify(call.args)}), result ${JSON.stringify(result)}`);
       return { functionResponse: { id: call.id, name: call.name, response: result } };
     });
     // The API returns an error for a function call sent back without its thoughtSignature, so the script sends the model's turn back unchanged.
     request.contents.push(turn, { role: "user", parts: results });
   }
   EOF
   ```

2. **Run the script with Bun:**

   ```sh
   bun store.ts
   ```

3. **Ask for something sold out.** Pass the customer's message as an argument:

   ```sh
   bun store.ts "Add 2 Kit Kats to my cart."
   ```

**Record:**
- Each tool call the model made in each run (the function name and arguments).
- Who executed the function: Gemini, or your local TypeScript code?
- How many HTTP requests did your script send to Gemini before the final text answer was printed?
- Does the final cart printed by the script match the assistant's text answer?
- In the Kit Kat run, which request to Gemini first included the fact that Kit Kats are sold out, and in which part of it?

## Part 4: Tools across applications with MCP

In Part 3, the tools were hardcoded inside `store.ts`. The Model Context Protocol (MCP) standardizes tool discovery and execution so that any client or agent can use tools provided by an external service. An MCP server answers two standard JSON-RPC methods, sent as POST requests to one URL:
- `tools/list`: returns the list of tools the server provides;
- `tools/call`: executes a tool with given arguments and returns the result.

[DeepWiki](https://docs.devin.ai/work-with-devin/deepwiki-mcp) runs a public MCP server providing tools that query GitHub repositories. These requests require no API key.

1. **List available tools.** Send a JSON-RPC request for `tools/list`. (A full MCP client first sends an `initialize` request; DeepWiki answers without one.)

   ```sh
   curl -s https://mcp.deepwiki.com/mcp \
       -H 'Content-Type: application/json' \
       -H 'Accept: application/json, text/event-stream' \
       -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' && echo ""
   ```

   The reply contains server-sent event lines; the JSON object following `data:` holds the result. Inspect one tool declaration: it has a `name`, a `description`, and an `inputSchema`. Notice how this schema corresponds to the `parameters` field in `store.ts`.

2. **Call a tool.** Send a JSON-RPC request for `tools/call` to ask a question about Vue's reactivity system (this request takes about 10 seconds):

   ```sh
   curl -s https://mcp.deepwiki.com/mcp \
       -H 'Content-Type: application/json' \
       -H 'Accept: application/json, text/event-stream' \
       -d '{"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {"name": "ask_wiki_question", "arguments": {"repoName": "vuejs/core", "question": "In one paragraph: how does Vue know when to re-render a component?"}}}' && echo ""
   ```

**Record:**
- The names of the tools DeepWiki exposes.
- Which of DeepWiki's tools only read data, and which could make changes?
- Do any of DeepWiki's tool declarations include `annotations`? A server can mark its own tools with `readOnlyHint`, and under the specification a client must treat that mark as untrusted unless the server itself is trusted.
- How did you decide which tools only read? What risk does that create when an agent calls a third-party server's tools?

## Submission

1. In your private repository, create a Markdown file named `prep-7.md` answering all prompts marked **Record**.
2. Commit and push your changes, and submit the commit URL on Commons.

<span class="emphasize">**Never include your API key, or terminal output containing your key, in your submission.**</span>

## Optional: Add DeepWiki to a coding agent

If you use a coding assistant that supports MCP, you can register DeepWiki and watch your agent invoke its tools:

- **Claude Code:** `claude mcp add --transport http deepwiki https://mcp.deepwiki.com/mcp`
- **Codex:** `codex mcp add deepwiki --url https://mcp.deepwiki.com/mcp`
- **Antigravity:** add `"deepwiki": { "serverUrl": "https://mcp.deepwiki.com/mcp" }` under `mcpServers` in your MCP configuration ([instructions](https://antigravity.google/docs/mcp)).

## Extra resources

- Gemini API guides: [text generation](https://ai.google.dev/gemini-api/docs/generate-content/text-generation), [structured output](https://ai.google.dev/gemini-api/docs/generate-content/structured-output), and [function calling](https://ai.google.dev/gemini-api/docs/generate-content/function-calling).
- MCP specification: [architecture overview](https://modelcontextprotocol.io/docs/getting-started/intro) and [tools specification](https://modelcontextprotocol.io/specification/2026-07-28/server/tools).

<style>
span.emphasize { color: var(--accent-red-light); }
</style>

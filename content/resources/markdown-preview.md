---
title: Live Markdown Previewer
description: A real-time GitHub-flavored Markdown previewer
---

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .header {
    background: #fff;
    border-bottom: 1px solid #e1e4e8;
    padding: 16px 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .container {
    display: flex;
    flex: 1;
    overflow: hidden;
    gap: 1px;
    background: #e1e4e8;
  }

  .pane {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #fff;
    overflow: hidden;
  }

  .pane-label {
    background: #f6f8fa;
    border-bottom: 1px solid #e1e4e8;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 600;
    color: #586069;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  #editor {
    flex: 1;
    padding: 16px;
    border: none;
    resize: none;
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.6;
    color: #24292e;
    background: #fff;
    outline: none;
  }

  #preview {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    background: #fff;
    font-size: 90%;
  }

  /* GitHub Markdown Styles */
  .markdown-body {
    word-wrap: break-word;
    line-height: 1.6;
  }

  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 0.3em;
  }

  .markdown-body h1 {
    font-size: 24pt;
    border-bottom: 1px solid #eaecef;
  }

  .markdown-body h2 {
    font-size: 20pt;
    border-bottom: 1px solid #eaecef;
  }

  .markdown-body h3 { font-size: 16pt; }
  .markdown-body h4 { font-size: 14pt; }
  .markdown-body h5 { font-size: 12pt; }
  .markdown-body h6 { font-size: 12pt; color: #6a737d; }

  .markdown-body p {
    margin-bottom: 16px;
  }

  .markdown-body a {
    color: #0366d6;
    text-decoration: none;
  }

  .markdown-body a:hover {
    text-decoration: underline;
  }

  .markdown-body strong {
    font-weight: 600;
  }

  .markdown-body code {
    background: #f6f8fa;
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    border-radius: 3px;
    font-family: 'Monaco', 'Courier New', monospace;
    color: #24292e;
  }

  .markdown-body pre {
    background: #f6f8fa;
    border-radius: 6px;
    padding: 16px;
    overflow: auto;
    margin-bottom: 16px;
    font-size: 13px;
    line-height: 1.45;
  }

  .markdown-body pre code {
    background: none;
    padding: 0;
    margin: 0;
    font-size: 100%;
    color: #24292e;
  }

  .markdown-body blockquote {
    padding: 0 15px;
    color: #6a737d;
    border-left: 4px solid #dfe2e5;
    margin: 16px 0;
  }

  .markdown-body ul,
  .markdown-body ol {
    padding-left: 2em;
    margin-bottom: 16px;
  }

  .markdown-body li {
    margin-bottom: 8px;
  }

  .markdown-body table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 16px;
    border: 1px solid #dfe2e5;
  }

  .markdown-body table th,
  .markdown-body table td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  .markdown-body table tr:nth-child(2n) {
    background: #f6f8fa;
  }

  .markdown-body hr {
    background: #e1e4e8;
    border: 0;
    height: 2px;
    margin: 24px 0;
  }

  .markdown-body img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 16px 0;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    #editor,
    #preview {
      font-size: 12px;
    }
  }
</style>

<div class="container">
  <div class="pane">
    <div class="pane-label">Input</div>
    <textarea id="editor" spellcheck="false" placeholder="Type markdown here..."></textarea>
  </div>
  <div class="pane">
    <div class="pane-label">Preview</div>
    <div id="preview" class="markdown-body"></div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/marked@11.1.1/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js"></script>
<script>
  const editor = document.getElementById('editor');
  const preview = document.getElementById('preview');

  function updatePreview() {
    const markdown = editor.value;
    const html = marked.parse(markdown);
    const clean = DOMPurify.sanitize(html);
    preview.innerHTML = clean;
  }

  editor.addEventListener('input', updatePreview);

  const sampleMarkdown = `# Markdown Example

**Note:** This is a live preview! You can edit the left pane and see the result
immediately rendered on the right side.

What's on this page:

1. Example of writing concept specifications in Markdown
2. Overview of Markdown syntax, with links to documentation

## Concept Specification Example
**concept** GiftRegistering [User, Item]\\
  **purpose** track purchases of requested gifts; prevent people buying you things you don't want\\
  **principle**\\
    a recipient creates a registry, and adds items to it indicating the number of each requested;\\
    opens the registry so it becomes publicly visible;\\
    then givers can view which items are still available and purchase them;\\
    and finally the recipient closes the registry, after which it is no longer publicly visible\\
    but the recipient can see which items were purchased and by whom.\\
  **state**\\
    a set of Registries with\\
      an owner User\\
      an active Flag\\
      a set of Requests

    a set of Requests with\\
      an Item\\
      a count Number\\
      a set of Purchases

    a set of Purchases with\\
      a purchaser User\\
      an Item\\
      a count Number\\
  **actions**\\
    create (owner: User) : return (registry: Registry)\\
      **then** create a new registry with this owner, active set to false and no requests, and return it

    addItem (registry: Registry, item: Item, count: Number)\\
      **where** registry exists and count is greater than zero\\
      **then** if a request for this item exists in this registry, add the given count to its count\\
      otherwise create a new request for the item with this count and no purchases, and add it to the registry

    removeItem (registry: Registry, item: Item)\\
      **where** a request for this item exists in the registry\\
      **then** remove the request from the registry and delete the request

    open (registry: Registry)\\
      **where** registry exists and is not active\\
      **then** make registry active

    close (registry: Registry)\\
      **where** registry exists and is active\\
      **then** make registry not active

    purchase (purchaser: User, registry: Registry, item: Item, count: Number)\\
      **where** registry exists and is active, count is greater than zero, and the registry has a request for this item with a count no less than the given count plus the sum of the counts of purchases for that request\\
      **then** create a new purchase for this purchaser, item and count, and add it to that request's purchases

## Markdown Syntax
[Github-flavored Markdown Manual](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

This is an example of **GitHub-flavored Markdown**.

### Text Formatting

- **Bold** with \`**\` or \`__\`.
- *Italic* with \`*\` or \`_\`.
- ~~Strikethrough~~ with \`~~\`.
- \`Monospace\` with backticks.

### Lists

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

1. Ordered item 1
2. Ordered item 2
   1. Subordered item 2.1
   2. Subordered item 2.2

### Links

[GitHub](https://github.com)

### Images

![Alt text](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

### Blockquotes

> To be, or not to be, that is the question.
>
> -- William Shakespeare

### Code Blocks

Inline \`code\` has \`back-ticks around\` it.

\`\`\`javascript
// JavaScript code with syntax highlighting
const greeting = 'Hello, world!';
console.log(greeting);
\`\`\`

### Tables

| Header1 | Header2 | Header3 |
| --- | --- | --- |
| Row1Col1 | Row1Col2 | Row1Col3 |
| Row2Col1 | Row2Col2 | Row2Col3 |
| Row3Col1 | Row3Col2 | Row3Col3 |

### Task Lists
* [x] Write some Markdown
* [ ] World domination

---

Horizontal rules are written as \`---\` on a blank line.

`;

  editor.value = sampleMarkdown;
  updatePreview();
</script>

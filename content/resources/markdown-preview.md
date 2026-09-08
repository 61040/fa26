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
    font-size: 32px;
    border-bottom: 1px solid #eaecef;
  }

  .markdown-body h2 {
    font-size: 24px;
    border-bottom: 1px solid #eaecef;
  }

  .markdown-body h3 { font-size: 20px; }
  .markdown-body h4 { font-size: 16px; }
  .markdown-body h5 { font-size: 14px; }
  .markdown-body h6 { font-size: 12px; color: #6a737d; }

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
      font-size: 14px;
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

  const sampleMarkdown = `# GitHub-flavored Markdown Example

## Usage
[Github-flavored Markdown Manual](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Example

This is an example of **GitHub-flavored Markdown**.

## Text Formatting

- **Bold** with \`**\` or \`__\`.
- *Italic* with \`*\` or \`_\`.
- ~~Strikethrough~~ with \`~~\`.
- \`Monospace\` with backticks.

## Lists

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

1. Ordered item 1
2. Ordered item 2
   1. Subordered item 2.1
   2. Subordered item 2.2

## Links

[GitHub](https://github.com)

## Images

![Alt text](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

## Blockquotes

> To be, or not to be, that is the question.
>
> -- William Shakespeare

## Code Blocks

Inline \`code\` has \`back-ticks around\` it.

\`\`\`javascript
// JavaScript code with syntax highlighting
const greeting = 'Hello, world!';
console.log(greeting);
\`\`\`

## Tables

| Header1 | Header2 | Header3 |
| --- | --- | --- |
| Row1Col1 | Row1Col2 | Row1Col3 |
| Row2Col1 | Row2Col2 | Row2Col3 |
| Row3Col1 | Row3Col2 | Row3Col3 |

## Task Lists
* [x] Write some Markdown
* [ ] World domination

---

Horizontal rules are written as \`---\` on a blank line.

`;

  editor.value = sampleMarkdown;
  updatePreview();
</script>

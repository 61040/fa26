// Adds a Copy button to the top right of every code block.
// The clipboard API only exists on secure pages, so there are no buttons without it.
if (navigator.clipboard) {
  for (const pre of document.querySelectorAll(".prose pre")) {
    const block = document.createElement("div");
    block.className = "code-block";
    pre.replaceWith(block);
    block.append(pre);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-code";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code");
    let reset;
    button.addEventListener("click", async () => {
      // Leave off the final newline, so a pasted command doesn't run before you press Enter.
      const text = pre.textContent.replace(/\n$/, "");
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied";
      } catch {
        button.textContent = "Couldn't copy";
      }
      clearTimeout(reset);
      reset = setTimeout(() => (button.textContent = "Copy"), 2000);
    });
    block.append(button);
  }
}

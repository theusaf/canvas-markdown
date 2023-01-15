// ==UserScript==
// @name         Canvas Markdown
// @namespace    https://theusaf.org
// @version      1.0.0
// @description  Adds a markdown editor to Canvas
// @author       theusaf
// @match        https://*/*
// @grant        none
// ==/UserScript==
if (
  new URL(document.querySelector("#global_nav_help_link").href).hostname ===
  "help.instructure.com"
) {
  console.log("[Canvas Markdown] Detected Canvas page, loading...");
  (async () => {
    console.log("[Canvas Markdown] Importing dependencies...");
    await import(
      "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.js"
    );
    await import(
      "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/mode/markdown/markdown.js"
    );
    {
      // TODO: Determine if this is actually needed.
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href =
        "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.css";
      document.head.append(css);
    }
    function getEditorElements() {
      return [...document.querySelectorAll(".ic-RichContentEditor")];
    }
    class MarkdownEditor {
      editorContainer;
      canvasTextArea;
      constructor(editor) {
        this.editorContainer = editor;
        this.canvasTextArea = this.getTextArea();
      }
      getTextArea() {
        return this.editorContainer.querySelector(
          "textarea[data-rich_text=true]"
        );
      }
      getSwitchEditorButton() {
        return this.editorContainer.querySelector("[data-btn-id=rce-edit-btn]");
      }
      isInTextMode() {
        return /rich text/i.test(this.getSwitchEditorButton().title);
      }
      getSwitchTypeButton() {
        return this.editorContainer.querySelector(
          "[data-btn-id=rce-editormessage-btn]"
        );
      }
      isInPlainMode() {
        return /pretty html/i.test(this.getSwitchTypeButton().title);
      }
      injectMarkdownEditor() {
        const editorContent = document.createElement("template");
        // Note: The heights should follow the same values as the canvas editor.
        // These values can also be changed by the user.
        editorContent.innerHTML = `
          <div id="markdown-editor-container">
            <textarea id="markdown-editor" style="height: 400px; resize: none;"></textarea>
            <div id="markdown-fancy-editor" style="height: 400px;">
            </div>
          </div>
        `;
        this.editorContainer
          .querySelector(".rce-wrapper")
          .append(editorContent.content.cloneNode(true));
      }
    }
    console.log("[Canvas Markdown] Done.");
  })();
} else {
  console.log("[Canvas Markdown] Not a Canvas page, skipping...");
}

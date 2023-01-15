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
  new URL(
    document.querySelector<HTMLAnchorElement>("#global_nav_help_link")?.href ??
      ""
  )?.hostname === "help.instructure.com"
) {
  console.log("[Canvas Markdown] Detected Canvas page, loading...");
  (async () => {
    console.log("[Canvas Markdown] Importing dependencies...");
    await import(
      "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.js" as any
    );
    await import(
      "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/mode/markdown/markdown.js" as any
    );

    {
      // TODO: Determine if this is actually needed.
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href =
        "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.css";
      document.head.append(css);
    }

    console.log("[Canvas Markdown] Done.");
  })();
} else {
  console.log("[Canvas Markdown] Not a Canvas page, skipping...");
}

function getEditorElements() {
  return [
    ...document.querySelectorAll<HTMLDivElement>(".ic-RichContentEditor"),
  ];
}

class MarkdownEditor {
  editorContainer: HTMLDivElement;
  canvasTextArea: HTMLTextAreaElement;
  markdownContainer: HTMLDivElement;
  markdownTextArea: HTMLTextAreaElement;
  markdownEditor: CodeMirror.Editor;

  constructor(editor: HTMLDivElement) {
    this.editorContainer = editor;
    this.canvasTextArea = this.getTextArea();

    this.editorContainer.setAttribute("md-id", "canvas-container");
  }

  getTextArea() {
    return this.editorContainer.querySelector<HTMLTextAreaElement>(
      "textarea[data-rich_text=true]"
    );
  }

  getSwitchEditorButton() {
    return this.editorContainer.querySelector<HTMLButtonElement>(
      "[data-btn-id=rce-edit-btn]"
    );
  }

  isInTextMode() {
    return /rich text/i.test(this.getSwitchEditorButton().title);
  }

  getSwitchTypeButton() {
    return this.editorContainer.querySelector<HTMLButtonElement>(
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
      <div md-id="markdown-editor-container">
        <textarea md-id="markdown-editor" style="height: 400px; resize: none;"></textarea>
      </div>
    `;
    this.editorContainer
      .querySelector(".rce-wrapper")
      .append(editorContent.content.cloneNode(true));
    this.markdownContainer = this.editorContainer.querySelector(
      "[md-id=markdown-editor-container]"
    );
    this.markdownTextArea = this.editorContainer.querySelector(
      "[md-id=markdown-editor]"
    );
    this.markdownEditor = CodeMirror.fromTextArea(this.markdownTextArea, {
      mode: "markdown",
      lineNumbers: true,
    });
    const codeMirrorEditor = this.markdownEditor.getWrapperElement();
    codeMirrorEditor.style.height = "400px";
    codeMirrorEditor.setAttribute("md-id", "markdown-editor-codemirror");
  }
}

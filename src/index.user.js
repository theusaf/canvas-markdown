// ==UserScript==
// @name         Canvas Markdown
// @namespace    https://theusaf.org
// @version      1.0.0
// @description  Adds a markdown editor to Canvas
// @author       theusaf
// @match        https://*/*
// @grant        none
// ==/UserScript==
if (new URL(document.querySelector("#global_nav_help_link")?.href ??
    "")?.hostname === "help.instructure.com") {
    console.log("[Canvas Markdown] Detected Canvas page, loading...");
    (async () => {
        console.log("[Canvas Markdown] Importing dependencies...");
        await import("https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.js");
        await import("https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/mode/markdown/markdown.js");
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js";
        document.head.append(s);
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href =
            "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.css";
        document.head.append(css);
        console.log("[Canvas Markdown] Setting up...");
        setupWatcher();
        console.log("[Canvas Markdown] Done.");
    })();
}
else {
    console.log("[Canvas Markdown] Not a Canvas page, skipping...");
}
function getEditorElements() {
    return [
        ...document.querySelectorAll(".ic-RichContentEditor:not([md-id=canvas-container])"),
    ];
}
function setupWatcher() {
    setInterval(() => {
        const potentialEditorElements = getEditorElements();
        if (potentialEditorElements.length) {
            for (const editorElement of potentialEditorElements) {
                const markdownEditor = new MarkdownEditor(editorElement);
                markdownEditor.setup();
            }
        }
    }, 1e3);
}
class MarkdownEditor {
    editorContainer;
    canvasTextArea;
    markdownTextContainer;
    markdownPrettyContainer;
    markdownTextArea;
    markdownEditor;
    constructor(editor) {
        this.editorContainer = editor;
        this.canvasTextArea = this.getTextArea();
    }
    setup() {
        this.editorContainer.setAttribute("md-id", "canvas-container");
        this.injectMarkdownEditor();
    }
    getTextArea() {
        return this.editorContainer.querySelector("textarea[data-rich_text=true]");
    }
    getSwitchEditorButton() {
        return this.editorContainer.querySelector("[data-btn-id=rce-edit-btn]");
    }
    isInTextMode() {
        return /rich text/i.test(this.getSwitchEditorButton().title);
    }
    getSwitchTypeButton() {
        return this.editorContainer.querySelector("[data-btn-id=rce-editormessage-btn]");
    }
    isInPlainMode() {
        return /pretty html/i.test(this.getSwitchTypeButton().title);
    }
    insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    injectMarkdownEditor() {
        const editorContent = document.createElement("template");
        // Note: The heights should follow the same values as the canvas editor.
        // These values can also be changed by the user.
        editorContent.innerHTML = `
      <div md-id="markdown-editor-text-container" style="display: none;">
        <textarea md-id="markdown-editor" style="height: 400px; resize: none;"></textarea>
      </div>
      <div md-id="markdown-editor-pretty-container">
        <div class="RceHtmlEditor">
          <div>
            <label>
              <span></span>
              <div class="react-codemirror2" md-id="markdown-editor-codemirror-container">
                <!-- Insert CodeMirror editor here -->
              </div>
            </label>
          </div>
        </div>
      </div>
    `;
        this.editorContainer
            .querySelector(".rce-wrapper")
            .prepend(editorContent.content.cloneNode(true));
        this.markdownTextContainer = this.editorContainer.querySelector("[md-id=markdown-editor-text-container]");
        this.markdownTextArea = this.editorContainer.querySelector("[md-id=markdown-editor]");
        this.markdownPrettyContainer = this.editorContainer.querySelector("[md-id=markdown-editor-pretty-container]");
        this.markdownEditor = CodeMirror(this.markdownPrettyContainer.querySelector("[md-id=markdown-editor-codemirror-container]"), {
            mode: "markdown",
            lineNumbers: true,
        });
        const codeMirrorEditor = this.markdownEditor.getWrapperElement();
        codeMirrorEditor.style.height = "400px";
        codeMirrorEditor.setAttribute("md-id", "markdown-editor-codemirror");
        // Hide the markdown editor. This also allows CodeMirror to properly render when the editor is shown.
        this.markdownPrettyContainer.style.display = "none";
    }
}

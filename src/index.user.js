// ==UserScript==
// @name         Canvas Markdown
// @namespace    https://theusaf.org
// @version      1.0.0
// @description  Adds a markdown editor to Canvas
// @author       theusaf
// @match        https://*/*
// @grant        none
// ==/UserScript==
if ([...document.head.querySelectorAll("style[type='text/css']")].find((element) => {
    return /\* This file is part of Canvas\./.test(element.textContent);
})) {
    (async () => {
        await import("https://raw.githubusercontent.com/theusaf/canvas-markdown/main/lib/codemirror/codemirror.js");
        await import("https://raw.githubusercontent.com/theusaf/canvas-markdown/main/lib/codemirror/mode/markdown/markdown.js");
        {
            // TODO: Determine if this is actually needed.
            const css = document.createElement("link");
            css.rel = "stylesheet";
            css.href =
                "https://raw.githubusercontent.com/theusaf/canvas-markdown/main/lib/codemirror/codemirror.css";
            document.head.append(css);
        }
        function getEditorElements() {
            return [
                ...document.querySelectorAll(".ic-RichContentEditor"),
            ];
        }
        class MarkdownEditor {
            editorContainer;
            canvasTextArea;
            constructor(editor) {
                this.editorContainer = editor;
                this.canvasTextArea = this.getTextArea();
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
            injectMarkdownEditor() {
                const editorContent = document.createElement("template");
                editorContent.innerHTML = `

    `;
                this.editorContainer
                    .querySelector(".rce-wrapper")
                    .append(editorContent.content.cloneNode(true));
            }
        }
    })();
}

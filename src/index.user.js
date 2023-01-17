// ==UserScript==
// @name         Canvas Markdown
// @namespace    https://theusaf.org
// @version      1.0.0
// @description  Adds a markdown editor to Canvas
// @author       theusaf
// @match        https://*/*
// @grant        none
// ==/UserScript==
let highlight, languages;
try {
    if (new URL(document.querySelector("#global_nav_help_link")
        ?.href ?? "")?.hostname === "help.instructure.com") {
        console.log("[Canvas Markdown] Detected Canvas page, loading...");
        (async () => {
            console.log("[Canvas Markdown] Importing dependencies...");
            await import("https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.js");
            await import("https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/mode/markdown/markdown.js");
            highlight = (await import("https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/highlight/es/core.min.js")).default;
            languages = (await import("https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/highlight/languages.js")).default;
            const s = document.createElement("script");
            s.src =
                "https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js";
            document.head.append(s);
            const codemirrorCSS = document.createElement("link");
            codemirrorCSS.rel = "stylesheet";
            codemirrorCSS.href =
                "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.css";
            const highlightCSS = document.createElement("link");
            highlightCSS.rel = "stylesheet";
            highlightCSS.href =
                "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/highlight/styles/github-dark.min.css";
            document.head.append(highlightCSS);
            document.head.append(codemirrorCSS);
            console.log("[Canvas Markdown] Setting up...");
            setupWatcher();
            console.log("[Canvas Markdown] Done.");
        })();
    }
    else {
        console.log("[Canvas Markdown] Not a Canvas page, skipping...");
    }
}
catch (e) { }
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
    markdownSwitchButton;
    showdownConverter;
    active = false;
    constructor(editor) {
        this.editorContainer = editor;
        this.canvasTextArea = this.getCanvasTextArea();
    }
    setup() {
        this.editorContainer.setAttribute("md-id", "canvas-container");
        this.injectMarkdownEditor();
        this.setupShowdown();
        this.injectMarkdownUI();
        this.applyEventListeners();
    }
    setupShowdown() {
        showdown.setFlavor("github");
        this.showdownConverter = new showdown.Converter({
            ghMentions: false,
        });
    }
    getCanvasTextArea() {
        return this.editorContainer.querySelector("textarea[data-rich_text=true]");
    }
    getCanvasSwitchEditorButton() {
        return this.editorContainer.querySelector("[data-btn-id=rce-edit-btn]");
    }
    isCanvasInTextMode() {
        return /rich text/i.test(this.getCanvasSwitchEditorButton().title);
    }
    getCanvasSwitchTypeButton() {
        return this.editorContainer.querySelector("[data-btn-id=rce-editormessage-btn]");
    }
    isCanvasInPlainMode() {
        return /pretty html/i.test(this.getCanvasSwitchTypeButton().title);
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
        // Hide the markdown editor. By doing it here, it also allows CodeMirror to
        // properly render when the editor is shown.
        this.markdownPrettyContainer.style.display = "none";
    }
    applyEventListeners() {
        this.markdownTextArea.addEventListener("input", this.updateCanvasData);
        this.markdownEditor.on("change", () => {
            this.markdownTextArea.value = this.markdownEditor.getValue();
            this.updateCanvasData();
        });
        const switchButton = this.getCanvasSwitchEditorButton();
        switchButton.onclick = () => {
            if (this.active) {
                this.deactivate();
            }
        };
        this.markdownSwitchButton.addEventListener("click", () => {
            if (this.active) {
                this.deactivate();
                switchButton.click();
            }
            else {
                this.activate();
            }
        });
    }
    activate() {
        this.active = true;
        this.markdownTextContainer.style.display = "none";
        this.markdownPrettyContainer.style.display = "block";
        const markdownCode = this.extractMarkdown(this.canvasTextArea.value);
        this.markdownTextArea.value = markdownCode;
        this.markdownEditor.setValue(markdownCode);
        if (!this.isCanvasInPlainMode()) {
            this.getCanvasSwitchEditorButton().click();
        }
        if (!this.isCanvasInTextMode()) {
            this.getCanvasSwitchTypeButton().click();
        }
    }
    deactivate() {
        this.active = false;
        this.markdownTextContainer.style.display = "none";
        this.markdownPrettyContainer.style.display = "none";
    }
    async updateCanvasData() {
        const markdownCode = this.markdownTextArea.value, output = await this.generateOutput(markdownCode);
        this.canvasTextArea.value = output;
        this.activateCanvasCallbacks();
    }
    activateCanvasCallbacks() {
        const customEvent = new CustomEvent("input");
        customEvent.keyCode = 13;
        customEvent.which = 13;
        customEvent.location = 0;
        customEvent.code = "Enter";
        customEvent.key = "Enter";
        customEvent.target = this.canvasTextArea;
        this.canvasTextArea.dispatchEvent(customEvent);
    }
    injectMarkdownUI() {
        const button = document.createElement("button"), switchButton = this.getCanvasSwitchEditorButton();
        button.setAttribute("type", "button");
        button.className = switchButton.className;
        button.setAttribute("style", switchButton.style.cssText);
        const buttonContent = document.createElement("template");
        buttonContent.innerHTML = `
    <span class="${switchButton.firstElementChild.className}">
      <span class="${switchButton.firstElementChild.firstElementChild.className}" style="${switchButton.firstElementChild.firstElementChild.style
            .cssText} direction="row" wrap="no-wrap">
        <span class="${switchButton.firstElementChild.firstElementChild.firstElementChild
            .className}">
          <span>M🠗</span>
        </span>
      </span>
    </span>
    `;
        button.append(buttonContent.content.cloneNode(true));
        this.markdownSwitchButton = button;
        this.insertAfter(button, switchButton);
    }
    /**
     * Extracts the markdown code from the html comment.
     */
    extractMarkdown(html) {
        return (html.match(/<!--CANVAS-MARKDOWN-CODE[^\n]*\n(.*)\nCANVAS-MARKDOWN-CODE-->\s*$/s)?.[1] ?? "");
    }
    async generateOutput(markdown) {
        const initialHTML = this.showdownConverter.makeHtml(markdown), outputHTML = await this.highlightCode(initialHTML);
        return `${outputHTML}
<!--CANVAS-MARKDOWN-CODE v1.0.0
${markdown}
CANVAS-MARKDOWN-CODE-->`;
    }
    async highlightCode(html) {
        const template = document.createElement("template");
        template.innerHTML = html;
        const codeBlocks = [
            ...template.content.querySelectorAll("pre code"),
        ];
        await this.extractLanguages(codeBlocks);
        for (const codeBlock of codeBlocks) {
            highlight.highlightElement(codeBlock);
        }
        return this.extractStyles(template);
    }
    extractStyles(template) {
        const tempDiv = document.createElement("div");
        tempDiv.style.display = "none";
        tempDiv.append(template.content.cloneNode(true));
        document.body.append(tempDiv);
        const hljsElements = [
            ...tempDiv.querySelectorAll("pre [class*=hljs]"),
        ];
        for (const element of hljsElements) {
            element.style.color = getComputedStyle(element).color;
        }
        const output = tempDiv.innerHTML;
        tempDiv.remove();
        return output;
    }
    async extractLanguages(codeBlocks) {
        for (const block of codeBlocks) {
            const language = block.className.match(/language-([^\s]*)/)?.[1];
            if (language && !highlight.getLanguage(language) && languages[language]) {
                const languageData = (await import(`https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/highlight/es/languages/${languages[language]}.min.js`).catch(() => { })).default;
                if (languageData) {
                    highlight.registerLanguage(language, languageData);
                }
            }
        }
    }
}

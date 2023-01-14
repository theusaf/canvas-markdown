// ==UserScript==
// @name         Canvas Markdown
// @namespace    https://theusaf.org
// @version      1.0.0
// @description  Adds a markdown editor to Canvas
// @author       theusaf
// @match        https://canvas.*.*/*
// @match        https://*.instructure.com/*
// @grant        none
// ==/UserScript==

import "https://raw.githubusercontent.com/theusaf/canvas-markdown/main/lib/codemirror/codemirror.js";
import "https://raw.githubusercontent.com/theusaf/canvas-markdown/main/lib/codemirror/mode/markdown/markdown.js";

function getEditorElements() {
  return [
    ...document.querySelectorAll<HTMLDivElement>(".ic-RichContentEditor"),
  ];
}

function getSwitchEditorButton(editor: HTMLDivElement) {
  return editor.querySelector<HTMLButtonElement>("[data-btn-id=rce-edit-btn]");
}

function isEditorInTextMode(editor: HTMLDivElement) {
  return /rich text/i.test(getSwitchEditorButton(editor).title);
}

function getSwitchTypeButton(editor: HTMLDivElement) {
  return editor.querySelector<HTMLButtonElement>(
    "[data-btn-id=rce-editormessage-btn]"
  );
}

function isEditorInPlainMode(editor: HTMLDivElement) {
  return /pretty html/i.test(getSwitchTypeButton(editor).title);
}

function injectMarkdownEditor(editor: HTMLDivElement) {
  const editorContent = document.createElement("template");
  editorContent.innerHTML = `
  <link rel="stylesheet" href="https://raw.githubusercontent.com/theusaf/canvas-markdown/main/lib/codemirror/codemirror.css">
  `;
  editor.querySelector(".rce-wrapper").append(
    editorContent.content.cloneNode(true)
  )
}

function getTextArea(editor: HTMLDivElement) {
  return editor.querySelector<HTMLTextAreaElement>("textarea[data-rich_text=true]");
}

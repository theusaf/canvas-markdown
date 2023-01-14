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

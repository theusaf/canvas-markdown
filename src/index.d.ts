declare module "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown@5216c569489b9aa2caa6aee49ef8aadabb1f1794/lib/codemirror/codemirror.js" {}
declare module "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown@5216c569489b9aa2caa6aee49ef8aadabb1f1794/lib/codemirror/mode/markdown/markdown.js" {}
declare module "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown@5216c569489b9aa2caa6aee49ef8aadabb1f1794/lib/highlight/es/core.min.js";
declare module "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown@5216c569489b9aa2caa6aee49ef8aadabb1f1794/lib/highlight/languages.js";

interface CanvasCallbackEvent extends Event {
  keyCode: number;
  which: number;
  location: number;
  code: string;
  key: string;
}

interface CanvasMarkdownStyle {
  target: string;
  style: string;
}

interface CanvasMarkdownSettings {
  customStyles: CanvasMarkdownStyle[];
  removeMarkdownBackup: boolean;
}

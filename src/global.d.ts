import CodeMirror from "@types/codemirror";

declare global {
  interface Window {
    CodeMirror: typeof CodeMirror;
  }
}

import "@types/codemirror";
import "@types/showdown";
import "@types/highlightjs";
import { ShowdownExtension } from "@types/showdown";
import * as Showdown from "@types/showdown";

declare global {
  declare namespace hljs {
    export function highlightElement(element: Node): void;
  }

  interface ShowdownKatexOptions {
    displayMode?: boolean;
    throwOnError?: boolean;
    errorColor?: string;
    delimiters?: Array<
      Partial<{
        left: string;
        right: string;
        display: boolean;
        asciimath: boolean;
      }>
    >;
  }

  interface Window {
    showdownKatex(options?: ShowdownKatexOptions): ShowdownExtension;
    showdown: typeof Showdown;
    CodeMirror: typeof CodeMirror;
  }
}

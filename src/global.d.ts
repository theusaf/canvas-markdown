import "@types/codemirror";
import "@types/showdown";
import "@types/highlightjs";

declare global {
  declare namespace hljs {
    export function highlightElement(element: Node): void;
  }
}

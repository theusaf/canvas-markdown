# Canvas Markdown

This userscript allows you to write your Canvas assignments in Markdown.

## Things to Note

This userscript stores the Markdown source embedded in the HTML value for the assignment as a comment.
Changes made to the assignment in the Canvas UI will not be reflected in the Markdown source.
Switching back to the Markdown editor will overwrite the HTML value with the Markdown source.

As of the current version, it is possible to self-xss yourself, so avoid using scripts in your Markdown.

## Dependencies

This userscript relies on third-party libraries to function. These libraries are imported during runtime from the following sources:

- [showdown.js](https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js)
- [codemirror](https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.js)
- [highlight.js](https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/highlight/es/highlight.js)

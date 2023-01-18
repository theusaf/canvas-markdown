# Canvas Markdown

This userscript allows you to write your Canvas assignments in Markdown.

## Installation

To install this user script, you will need a userscript manager, such as [Tampermonkey](https://www.tampermonkey.net/).

- You can install this script from [Greasy Fork](https://greasyfork.org/en/scripts/458457-canvas-markdown).
- You can also install this directly from [GitHub](https://github.com/theusaf/canvas-markdown/raw/main/src/index.user.js).

## Things to Note

This user script stores the Markdown source embedded in the HTML value for the assignment as a comment.
Changes made to the assignment in the Canvas UI will not be reflected in the Markdown source.
Switching back to the Markdown editor will overwrite the HTML value with the Markdown source.

## Dependencies

This user script relies on third-party libraries to function. These libraries are imported during runtime from the following sources:

- [showdown.js](https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js)
- [codemirror](https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.js)
- [highlight.js](https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/highlight/es/highlight.js)

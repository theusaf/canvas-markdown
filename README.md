# Canvas Markdown

This userscript allows you to write your Canvas assignments and pages in Markdown.

## Installation

To install this user script, you will need a userscript manager, such as [Tampermonkey](https://www.tampermonkey.net/).

- You can install this script from [Greasy Fork](https://greasyfork.org/en/scripts/458457-canvas-markdown).
- You can also install this directly from [GitHub](https://github.com/theusaf/canvas-markdown/raw/main/src/index.user.js).

## Usage

Whenever a Canvas text field is detected, a couple of buttons will be placed next to the HTML editor button.

Clicking on the Markdown button (M🠗) will open the Markdown editor. Click it again to close the editor.

The editor has two modes: Pretty and raw.

- Pretty mode uses CodeMirror to provide syntax highlighting and line numbers. However, it disables spellcheck and auto-complete.
- Raw mode is a plain text area with spellcheck and auto-complete enabled.

There is also a settings button (M⚙) that allows you to customize the styles of certain elements in the output. These settings are saved in your browser's local storage.

You can also download the settings as a JSON file and upload them again on another device or browser.

## Features

- Markdown editor (duh)
- Syntax highlighting
- Code blocks (with syntax highlighting for many languages)
- Customizable styles

## Things to Note

This user script stores the Markdown source embedded in the HTML value for the assignment as a comment.
Changes made to the assignment in the Canvas UI will not be reflected in the Markdown source.
Switching back to the Markdown editor will overwrite the HTML value with the Markdown source.

## Dependencies

This user script relies on third-party libraries to function. These libraries are imported during runtime from the following sources: (See the `/lib` directory for more information)

- [showdown.js](https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js)
- [codemirror](https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.js)
- [highlight.js](https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/highlight/es/highlight.js)

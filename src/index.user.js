// ==UserScript==
// @name         Canvas Markdown
// @namespace    https://theusaf.org
// @version      1.0.0
// @description  Adds a markdown editor to Canvas
// @author       theusaf
// @match        https://*/*
// @grant        none
// ==/UserScript==
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
var _a, _b, _c;
var _this = this;
if (
  ((_c = new URL(
    (_b =
      (_a = document.querySelector("#global_nav_help_link")) === null ||
      _a === void 0
        ? void 0
        : _a.href) !== null && _b !== void 0
      ? _b
      : ""
  )) === null || _c === void 0
    ? void 0
    : _c.hostname) === "help.instructure.com"
) {
  console.log("[Canvas Markdown] Detected Canvas page, loading...");
  (function () {
    return __awaiter(_this, void 0, void 0, function () {
      function getEditorElements() {
        return __spreadArray(
          [],
          document.querySelectorAll(".ic-RichContentEditor"),
          true
        );
      }
      var css, MarkdownEditor;
      return __generator(this, function (_a) {
        var _b, _c;
        switch (_a.label) {
          case 0:
            console.log("[Canvas Markdown] Importing dependencies...");
            return [
              4 /*yield*/,
              ((_b =
                "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.js"),
              Promise.resolve().then(function () {
                return require(_b);
              })),
            ];
          case 1:
            _a.sent();
            return [
              4 /*yield*/,
              ((_c =
                "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/mode/markdown/markdown.js"),
              Promise.resolve().then(function () {
                return require(_c);
              })),
            ];
          case 2:
            _a.sent();
            {
              css = document.createElement("link");
              css.rel = "stylesheet";
              css.href =
                "https://cdn.jsdelivr.net/gh/theusaf/canvas-markdown/lib/codemirror/codemirror.css";
              document.head.append(css);
            }
            MarkdownEditor = /** @class */ (function () {
              function MarkdownEditor(editor) {
                this.editorContainer = editor;
                this.canvasTextArea = this.getTextArea();
              }
              MarkdownEditor.prototype.getTextArea = function () {
                return this.editorContainer.querySelector(
                  "textarea[data-rich_text=true]"
                );
              };
              MarkdownEditor.prototype.getSwitchEditorButton = function () {
                return this.editorContainer.querySelector(
                  "[data-btn-id=rce-edit-btn]"
                );
              };
              MarkdownEditor.prototype.isInTextMode = function () {
                return /rich text/i.test(this.getSwitchEditorButton().title);
              };
              MarkdownEditor.prototype.getSwitchTypeButton = function () {
                return this.editorContainer.querySelector(
                  "[data-btn-id=rce-editormessage-btn]"
                );
              };
              MarkdownEditor.prototype.isInPlainMode = function () {
                return /pretty html/i.test(this.getSwitchTypeButton().title);
              };
              MarkdownEditor.prototype.injectMarkdownEditor = function () {
                var editorContent = document.createElement("template");
                // Note: The heights should follow the same values as the canvas editor.
                // These values can also be changed by the user.
                editorContent.innerHTML =
                  '\n          <div md-id="markdown-editor-container">\n            <textarea md-id="markdown-editor" style="height: 400px; resize: none;"></textarea>\n          </div>\n        ';
                this.editorContainer
                  .querySelector(".rce-wrapper")
                  .append(editorContent.content.cloneNode(true));
                this.markdownContainer = this.editorContainer.querySelector(
                  "[md-id=markdown-editor-container]"
                );
                this.markdownTextArea = this.editorContainer.querySelector(
                  "[md-id=markdown-editor]"
                );
                this.markdownEditor = CodeMirror.fromTextArea(
                  this.markdownTextArea,
                  {
                    mode: "markdown",
                    lineNumbers: true,
                  }
                );
                var codeMirrorEditor = this.markdownEditor.getWrapperElement();
                codeMirrorEditor.style.height = "400px";
                codeMirrorEditor.setAttribute(
                  "md-id",
                  "markdown-editor-codemirror"
                );
              };
              return MarkdownEditor;
            })();
            console.log("[Canvas Markdown] Done.");
            return [2 /*return*/];
        }
      });
    });
  })();
} else {
  console.log("[Canvas Markdown] Not a Canvas page, skipping...");
}

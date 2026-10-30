# Studio source

The studio is plain JavaScript split into small files that share one global scope. There is no build step: `studio.html` loads them in this order.

| File | What it holds |
| --- | --- |
| `../../tools.js` | The tool list shown in the menus (group, id, label) |
| `../../cssmap.js` | Reads pasted CSS and turns it into tool settings (used by Import CSS and the gallery) |
| `helpers.js` | Helpers used by more than one tool: color math, number formatting |
| `core.js` | State, DOM helpers, `build()` and `update()`, the Box shadow, Text shadow and Filter tools, and the empty `G` registry |
| `engine.js` | `buildGen()` draws a tool's controls, `updateGen()` draws its preview |
| `handles.js` | Drag handles, guides and snapping on the preview, and the shadow lamp |
| `output.js` | CSS, Tailwind, SCSS, variables and React output, plus the share link |
| `panel.js` | Undo, redo, reset, Import CSS, browser support notes and saved looks |
| `tools/*.js` | One file per menu group. Each ends with `Object.assign(G, { ... })` holding that group's tools |
| `init.js` | Reads the URL and opens the first tool. Must load last |

## Add a tool

1. Add `['myid', 'My tool']` to a group in `tools.js`.
2. Add the definition to the matching file in `tools/` inside its `Object.assign(G, { ... })`. Keep helpers that only your tool uses at the top of the same file.
3. Run `npm test`. It checks that every listed tool has a definition, produces valid code and fits on a phone.

A tool is an object with `label`, `s` (its default settings), `f` (the controls, or a function that returns them), `out` (the CSS declarations) and optionally `code`, `html`, `pv`, `handles` and `hset`. See `tools/shape.js` for a tool with drag handles and `tools/utilities.js` for tools with their own text output.

## Add a file

Add its `<script>` tag to `studio.html` and its path to `CORE` in `sw.js`, then bump the `V` version there. The tests fail if a script is missing from either place.

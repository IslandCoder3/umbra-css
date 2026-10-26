# Umbra

An all-in-one CSS toolkit with ready-made, copyable designs and generators for everyday styling, built mobile-first for developers.

**Category:** Developer Tools / Web App

**Live site:** https://islandcoder3.github.io/umbra-css/

**Built with:** HTML, CSS, JavaScript

## About

Built as a go-to reference for front-end developers, Umbra pairs a gallery of 82 ready-made CSS designs with a studio of 30 generators for the properties people look up all the time. Every design and every generator ends in the same place: clean, plain CSS you can copy straight into a project. Most visitors are on phones, so the whole site is designed mobile-first and kept light enough to stay smooth on slower devices.

## Features

- Gallery of over 120 ready-made designs across 12 categories: Shadows, Gradients, Backgrounds, Buttons, Cards, Glass, Shapes, Text, Filters, Loaders, Hover and Components
- Live previews on every card, with interactive designs (hover effects, toggles, inputs, loaders) that work right on the card
- One-tap "Copy CSS" on each design, plus an "Edit" panel that opens the code beside a live preview so changes show as you type (a bottom sheet on mobile), with Reset and copy-your-edit
- "Open in studio" button in the edit panel that sends the design, including your edits, to the matching generator (box shadow, text shadow, filter, gradient, radius, clip-path or glass) with its values already filled in
- Favorites (a heart on every design, remembered in the browser) and a direct link to every design, for example `index.html#soft-lift`
- "Save look" in the studio keeps your own generator settings in the browser, next to Share link
- Installable as an app and usable offline (web app manifest and service worker)
- Share previews (Open Graph and Twitter cards), favicon and app icons, a custom 404 page, `robots.txt` and `sitemap.xml`
- Category filter chips with counts and instant search (press `/` to jump to the search box)
- Studio with 30 generators in 8 groups:
  - Effects: box shadow, text shadow, filter, glass (with tint), neumorphism
  - Shape: border radius, clip-path (presets, or draw your own with draggable points, center guides, snapping and a Center shape button), transform (including 3D), border, SVG blob and wave generator
  - Color: gradient (up to 5 stops, repeating), palette (50 to 900 shades), converter (HEX, RGB, HSL and OKLCH with opacity), contrast checker with one-click AA and AAA fixes, blend modes
  - Layout: flexbox with per-item controls, grid with auto-fit and auto-fill, grid areas, aspect ratio
  - Type and units: typography, fluid clamp generator (any property, full type scale, rem or px output, vw or cqi scaling, size table), px to rem tables, spacing scale
  - Motion: keyframe animation (presets or custom, delay, direction, fill mode), cubic-bezier easing
  - Responsive and UI: media queries, container queries, custom scrollbar, specificity calculator
  - Utilities: CSS formatter and minifier
- Visual editing: drag the easing curve, gradient stops and angle dial, border radius handles and clip-path points right on the preview
- Paste any CSS into **Import CSS** to open it in the matching generator, plus Undo, Redo (Ctrl+Z) and Reset on every tool
- Per-side borders with outline, multi-step custom keyframes, and browser support notes on the tools that need them
- Export single-rule results as plain CSS, Tailwind arbitrary properties, SCSS, CSS variables or a React style object, and copy a share link that restores the exact settings
- Draggable lamp in the shadow tools that aims the shadow direction directly on the preview
- Media query tool with a breakpoint ladder in the classic `@media only screen and (max-width : 1024px)` style, desktop-first or mobile-first, with Bootstrap and Tailwind presets and optional device comments
- Deep links to any generator (for example `studio.html#flex`) from the homepage tools section
- Light and dark theme with a visible switch that follows the device setting and remembers the visitor's choice
- Mobile-first responsive layout: two-column gallery, sticky live preview while adjusting controls, horizontally scrolling category and tool tabs
- Performance-minded: cards are built once and shown or hidden when filtering, the first screen renders immediately while the rest loads in the background, and there is no per-card blur

## Tech Stack

Vanilla HTML, CSS, and JavaScript — no frameworks or build tools required to run it. Fonts load from Google Fonts. Optional smoke tests (`npm install`, `npx playwright install chromium`, then `npm test`) check every design, every generator, share links, mobile overflow and the metadata files.

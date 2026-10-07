# Umbra

An all-in-one CSS toolkit with ready-made, copyable designs and generators for everyday styling, built mobile-first for developers.

**Category:** Developer Tools / Web App

**Live site:** https://islandcoder3.github.io/umbra-css/

**Built with:** HTML, CSS, JavaScript

## About

Built as a go-to reference for front-end developers, Umbra pairs a gallery of 82 ready-made CSS designs with a studio of 24 generators for the properties people look up all the time. Every design and every generator ends in the same place: clean, plain CSS you can copy straight into a project. Most visitors are on phones, so the whole site is designed mobile-first and kept light enough to stay smooth on slower devices.

## Features

- Gallery of 82 ready-made designs across 12 categories: Shadows, Gradients, Backgrounds, Buttons, Cards, Glass, Shapes, Text, Filters, Loaders, Hover and Components
- Live previews on every card, with interactive designs (hover effects, toggles, inputs, loaders) that work right on the card
- One-tap "Copy CSS" on each design, plus an "Edit" panel that opens the code beside a live preview so changes show as you type (a bottom sheet on mobile), with Reset and copy-your-edit
- "Open in studio" button in the edit panel that sends the design, including your edits, to the matching generator (box shadow, text shadow, filter, gradient, radius, clip-path or glass) with its values already filled in
- Category filter chips with counts and instant search (press `/` to jump to the search box)
- Studio with 24 generators in 7 groups:
  - Effects: box shadow, text shadow, filter, glass, neumorphism
  - Shape: border radius, clip-path, transform, border
  - Color: gradient, palette (50 to 900 shades), HEX/RGB/HSL converter, contrast checker, blend modes
  - Layout: flexbox, grid, grid areas
  - Type and units: typography, fluid type with `clamp()`, px to rem
  - Motion: keyframe animation, cubic-bezier easing
  - Responsive and UI: media queries, custom scrollbar
- Draggable lamp in the shadow tools that aims the shadow direction directly on the preview
- Media query tool with a breakpoint ladder in the classic `@media only screen and (max-width : 1024px)` style, desktop-first or mobile-first, with Bootstrap and Tailwind presets and optional device comments
- Deep links to any generator (for example `studio.html#flex`) from the homepage tools section
- Light and dark theme with a visible switch that follows the device setting and remembers the visitor's choice
- Mobile-first responsive layout: two-column gallery, sticky live preview while adjusting controls, horizontally scrolling category and tool tabs
- Performance-minded: cards are built once and shown or hidden when filtering, the first screen renders immediately while the rest loads in the background, and there is no per-card blur

## Tech Stack

Vanilla HTML, CSS, and JavaScript — no frameworks or build tools required to run it. Fonts load from Google Fonts.

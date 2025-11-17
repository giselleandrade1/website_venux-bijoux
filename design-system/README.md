# Design System — Venux Bijoux

This folder contains the canonical design tokens and CSS variables used across the project.

Files:

- `variables.css` — exported CSS variables (light and dark mappings). Import into your global stylesheet to make tokens available to any component.
- `tokens.json` (optional) — machine-readable tokens (color, typography, spacing). Use to generate platform-specific themes.

How to use:

- In the root/global CSS (e.g., `globals.css`), import `design-system/variables.css`:

```css
@import "../design-system/variables.css";
```

- For dynamic theme switching, toggle the `data-theme` attribute on the `html` or `body` element:

```js
document.documentElement.setAttribute("data-theme", "dark");
```

- Prefer CSS variables (e.g., `var(--color-primary)`) in components and styled-components to keep theming consistent.

Accessibility notes:

- Colors were chosen to match the coffee palette. Run contrast checks (e.g., Lighthouse, Axe) and adjust `--color-text` vs backdrop values if necessary.
- When creating decorative accents (gold/silver) ensure sufficient contrast for interactive elements.

Next steps:

- Export `tokens.json` from the canonical source and generate platform-specific themes (React Native, iOS/Android) if needed.
- Add automated contrast checks to the CI pipeline.

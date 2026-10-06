# component-library

React + TypeScript design system starter for the Prima home test. Built as a publishable component library with CSS-in-JS (`styled-components`). **Tailwind and other CSS frameworks are not used.**

## Stack

- React 19 + TypeScript (strict)
- `styled-components` for styles (CSS written from scratch)
- Vite library build (ESM + CJS + `.d.ts`)
- Storybook 9 for docs and visual review
- Vitest + Testing Library + `jest-axe` for unit/a11y tests

## Install / scripts

```bash
npm install
npm run storybook      # component docs on :6006
npm test              # unit + a11y tests
npm run build         # library build → dist/
npm run lint
```

Peer dependencies for consumers: `react`, `react-dom`, `styled-components`.

## ThemeProvider

All components expect a theme. Wrap your app (and Storybook already does this):

```tsx
import { ThemeProvider, Button } from "component-library";

export function App() {
  return (
    <ThemeProvider>
      <Button variant="primary">Save</Button>
    </ThemeProvider>
  );
}
```

Tokens are layered for Open/Closed + Dependency Inversion. **Figma tokens always win.**

1. **Color / Spacing / Typography** — exact Figma definitions (`SurfaceHigh`, `Inverse`, `spacing.S`, `body-m`, …)
2. **Semantic** — intent aliases that only reference Figma values
3. **Component** — scoped maps for `button`, plus placeholders for `badge` and `tabs`

Browse them in Storybook under **Foundations / Tokens** (Color, Spacing, Typography, Semantic, Component).

Import tokens when needed:

```ts
import {
  colorTokensDefinition,
  spacingCss,
  typographyTokensDefinition,
  tokens,
  theme,
} from "component-library";

colorTokensDefinition.Inverse;
spacingCss("S"); // "1rem"
typographyTokensDefinition["body-m"];
theme.component.button.variant.primary.background;
```

Components must not hardcode hex colors; they read from `theme` / `tokens`.

## Component conventions (Clean Code / SOLID)

Folder layout per component:

```
src/components/<name>/
  Component.tsx
  index.ts
  __docs__/          # Storybook stories + MDX
  __test__/          # Vitest suites
```

API conventions (see `Button` as the reference):

- Prefer **`variant`** unions over boolean flags (`primary?: boolean`)
- Prefer **`children`** for composition (icons, future Badge slots)
- Use **`forwardRef`**
- Style with **transient props** (`$variant`, `$size`) so React props are not leaked to the DOM
- Style maps keyed by variant/size (Open/Closed) instead of nested ternaries
- Depend on **theme tokens**, not literals (Dependency Inversion)

## Accessibility checklist (WCAG 2.2 AA / WCAG 3.0 outcomes)

For every interactive component:

- [ ] Correct semantics / roles (`button`, future `tablist` / `tab` / `tabpanel`)
- [ ] Accessible name (visible text or `aria-label`)
- [ ] Keyboard operable; no keyboard trap
- [ ] `:focus-visible` ring from theme tokens
- [ ] Disabled / selected / expanded state exposed to AT
- [ ] Contrast of text and UI states meets AA
- [ ] Storybook a11y addon + `jest-axe` coverage

`Button` already implements focus-visible rings, disabled state, and axe assertions.

## Future API sketch: Tabs + Badge (not implemented yet)

Planned composition (for the next phase — tokens already exist under `theme.component.tabs` / `theme.component.badge`):

```tsx
<Tabs variant="underline" defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">
      Overview <Badge variant="Positive">New</Badge>
    </Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">…</Tabs.Panel>
  <Tabs.Panel value="details">…</Tabs.Panel>
</Tabs>
```

Acceptance criteria from the brief map to:

- Tab **variants** via `variant` on `Tabs`
- **Badge** as composable children inside `Tab` (or a dedicated slot prop)
- Badge **variants** via `Badge`’s own `variant` API

## Button example

```tsx
import { Button, ThemeProvider } from "component-library";

<ThemeProvider>
  <Button variant="secondary" size="large" onClick={() => {}}>
    Continue
  </Button>
</ThemeProvider>
```

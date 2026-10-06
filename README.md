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
3. **Component** — scoped maps for `button`, `badge`, and `tabs`

Browse them in Storybook under **Foundations / Tokens** (Color, Spacing, Typography, Semantic, Component). Accessibility guidance (keyboard, gaps, AT checklist) lives under **Foundations / Accessibility**.

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
- Prefer **`children`** for composition (icons, Badge slots)
- Use **`forwardRef`**
- Style with **transient props** (`$variant`, `$size`) so React props are not leaked to the DOM
- Style maps keyed by variant/size (Open/Closed) instead of nested ternaries
- Depend on **theme tokens**, not literals (Dependency Inversion)

## Accessibility checklist (WCAG 2.2 AA / WCAG 3.0 outcomes)

Figma-first: tokens are not overridden for contrast or hit-area. Gaps are tested and documented in **Foundations / Accessibility**.

For every interactive component:

- [x] Correct semantics / roles (`button`, `tablist` / `tab` / `tabpanel`)
- [x] Accessible name (visible text or `aria-label` / `accessibilityLabel`)
- [x] Keyboard operable; no keyboard trap
- [x] `:focus-visible` ring from theme tokens
- [x] Disabled / selected state exposed to AT
- [~] Contrast of text and UI states measured; known Figma gaps documented (focus `Outline`, etc.)
- [x] Storybook a11y addon (`test: "error"`) + `jest-axe` coverage
- [x] `forced-colors` adaptations on Button, Tab, Badge
- [ ] Manual VoiceOver / NVDA smoke (checklist in Accessibility docs)

## Tabs + Badge composition

```tsx
import {
  Tabs,
  TabList,
  TabPanel,
  Tab,
  Badge,
  ThemeProvider,
} from "component-library";

<ThemeProvider>
  <Tabs variant="Underline" defaultSelectedKey="overview" aria-label="Sections">
    <TabList>
      <Tab id="overview" badge={<Badge variant="Positive">New</Badge>}>
        Overview
      </Tab>
      <Tab id="details">Details</Tab>
    </TabList>
    <TabPanel id="overview">…</TabPanel>
    <TabPanel id="details">…</TabPanel>
  </Tabs>
</ThemeProvider>
```

- Tab **variants** via `variant` on `Tabs` (`Pill` | `Underline`)
- **Badge** via Tab `badge` slot or as composed children
- Badge **variants** via `Badge`’s own `variant` API (`Neutral` | `Positive` | `Negative`)

## Button example

```tsx
import { Button, ThemeProvider } from "component-library";

<ThemeProvider>
  <Button variant="secondary" size="large" onClick={() => {}}>
    Continue
  </Button>
</ThemeProvider>
```

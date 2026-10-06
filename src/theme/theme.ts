import { component, primitive, semantic, tokens } from "../tokens";
import { colorTokensDefinition } from "../tokens/color";
import { spacingTokensDefinition } from "../tokens/spacing";
import {
  fontWeightTokensDefinition,
  typographyTokensDefinition,
} from "../tokens/typography";

export const theme = {
  tokens,
  color: {
    ...colorTokensDefinition,
    ...semantic.color,
  },
  spacing: spacingTokensDefinition,
  typography: typographyTokensDefinition,
  fontWeight: fontWeightTokensDefinition,
  focus: {
    ring: semantic.color.focus.ring,
    ringWidth: component.button.focusRingWidth,
    ringOffset: component.button.focusRingOffset,
  },
  component,
  primitive,
} as const;

export type AppTheme = typeof theme;

declare module "styled-components" {
  // Module augmentation requires interface merging with DefaultTheme.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}

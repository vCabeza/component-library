export {
  colorTokensDefinition,
  type ColorToken,
} from "./color";

export {
  spacingTokensDefinition,
  spacingTokenOrder,
  spacingCss,
  type SpacingToken,
} from "./spacing";

export {
  typographyTokensDefinition,
  fontWeightTokensDefinition,
  type TypographyToken,
  type FontWeightToken,
} from "./typography";

export { primitive } from "./primitive";
export type { PrimitiveTokens } from "./primitive";

export { semantic } from "./semantic";
export type { SemanticTokens } from "./semantic";

export { component, buttonTokens, badgeTokens, tabsTokens } from "./component";
export type { ComponentTokens } from "./component";

import { colorTokensDefinition } from "./color";
import { spacingTokensDefinition } from "./spacing";
import {
  fontWeightTokensDefinition,
  typographyTokensDefinition,
} from "./typography";
import { primitive } from "./primitive";
import { semantic } from "./semantic";
import { component } from "./component";

export const tokens = {
  color: colorTokensDefinition,
  spacing: spacingTokensDefinition,
  typography: typographyTokensDefinition,
  fontWeight: fontWeightTokensDefinition,
  primitive,
  semantic,
  component,
} as const;

export type Tokens = typeof tokens;

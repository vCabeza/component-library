import { colorTokensDefinition } from "./color";
import { spacingTokensDefinition } from "./spacing";
import {
  fontWeightTokensDefinition,
  typographyTokensDefinition,
} from "./typography";

export const primitive = {
  color: colorTokensDefinition,
  spacing: spacingTokensDefinition,
  typography: typographyTokensDefinition,
  fontWeight: fontWeightTokensDefinition,
} as const;

export type PrimitiveTokens = typeof primitive;

export { colorTokensDefinition } from "./color";
export type { ColorToken } from "./color";
export {
  spacingTokensDefinition,
  spacingTokenOrder,
  spacingCss,
} from "./spacing";
export type { SpacingToken } from "./spacing";
export {
  typographyTokensDefinition,
  fontWeightTokensDefinition,
} from "./typography";
export type { TypographyToken, FontWeightToken } from "./typography";

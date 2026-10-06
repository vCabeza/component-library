import { colorTokensDefinition } from "./color";
import { spacingTokensDefinition } from "./spacing";
import { typographyTokensDefinition } from "./typography";

export const semanticColor = {
  text: {
    primary: colorTokensDefinition.OnNeutral,
    onNeutral: colorTokensDefinition.OnNeutral,
    onInverse: colorTokensDefinition.OnInverse,
  },
  surface: {
    high: colorTokensDefinition.SurfaceHigh,
    hover: colorTokensDefinition.SurfaceHover,
    active: colorTokensDefinition.SurfaceActive,
    positive: colorTokensDefinition.SurfacePositive,
    negative: colorTokensDefinition.SurfaceNegative,
  },
  inverse: {
    default: colorTokensDefinition.Inverse,
    hover: colorTokensDefinition.InverseHover,
    active: colorTokensDefinition.InverseActive,
  },
  border: {
    outline: colorTokensDefinition.Outline,
  },
  focus: {
    ring: colorTokensDefinition.Outline,
  },
  action: {
    primary: {
      default: colorTokensDefinition.Inverse,
      hover: colorTokensDefinition.InverseHover,
      active: colorTokensDefinition.InverseActive,
      contrast: colorTokensDefinition.OnInverse,
    },
    secondary: {
      default: colorTokensDefinition.SurfaceHigh,
      hover: colorTokensDefinition.SurfaceHover,
      active: colorTokensDefinition.SurfaceActive,
      contrast: colorTokensDefinition.OnNeutral,
    },
  },
  disabled: {
    foreground: colorTokensDefinition.InverseActive,
    background: colorTokensDefinition.SurfaceActive,
    border: colorTokensDefinition.Outline,
  },
} as const;

export const semantic = {
  color: semanticColor,
  spacing: spacingTokensDefinition,
  typography: typographyTokensDefinition,
} as const;

export type SemanticTokens = typeof semantic;

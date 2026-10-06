import { colorTokensDefinition } from "./color";
import { spacingTokensDefinition } from "./spacing";
import {
  fontWeightTokensDefinition,
  typographyTokensDefinition,
} from "./typography";
import { semantic } from "./semantic";

/**
 * Component tokens — scoped maps using only Figma-backed semantic/primitive values.
 */

export const buttonTokens = {
  radius: spacingTokensDefinition["3XS"].rem,
  fontFamily: typographyTokensDefinition["body-m"].fontFamily,
  focusRingWidth: spacingTokensDefinition["4XS"].rem,
  focusRingOffset: spacingTokensDefinition["3XS"].rem,
  focusRingColor: semantic.color.focus.ring,
  gap: spacingTokensDefinition["2XS"].rem,
  size: {
    small: {
      typography: typographyTokensDefinition["body-s"],
      paddingY: spacingTokensDefinition["2XS"].rem,
      paddingX: spacingTokensDefinition.S.rem,
    },
    medium: {
      typography: typographyTokensDefinition["body-m"],
      paddingY: spacingTokensDefinition.XS.rem,
      paddingX: spacingTokensDefinition.M.rem,
    },
    large: {
      typography: typographyTokensDefinition["body-m"],
      paddingY: spacingTokensDefinition.S.rem,
      paddingX: spacingTokensDefinition.L.rem,
    },
  },
  variant: {
    primary: {
      background: semantic.color.action.primary.default,
      backgroundHover: semantic.color.action.primary.hover,
      backgroundActive: semantic.color.action.primary.active,
      foreground: semantic.color.action.primary.contrast,
      border: "transparent",
    },
    secondary: {
      background: semantic.color.action.secondary.default,
      backgroundHover: semantic.color.action.secondary.hover,
      backgroundActive: semantic.color.action.secondary.active,
      foreground: semantic.color.action.secondary.contrast,
      border: "transparent",
    },
  },
  disabled: {
    background: semantic.color.disabled.background,
    foreground: semantic.color.disabled.foreground,
    border: semantic.color.disabled.border,
  },
} as const;

export const badgeTokens = {
  typography: typographyTokensDefinition["body-s"],
  fontWeight: fontWeightTokensDefinition.bold,
  color: colorTokensDefinition.OnNeutral,
  desktop: {
    paddingY: spacingTokensDefinition["3XS"].rem,
    paddingX: spacingTokensDefinition["2XS"].rem,
    height: spacingTokensDefinition.BadgeDesktopHeight.rem,
    /** Figma Desktop radius 12px (= spacing XS). */
    radius: spacingTokensDefinition.XS.rem,
  },
  mobile: {
    paddingY: spacingTokensDefinition["4XS"].rem,
    paddingX: spacingTokensDefinition["3XS"].rem,
    height: spacingTokensDefinition.BadgeMobileHeight.rem,
    /** Figma Mobile radius 8px (= spacing 2XS). */
    radius: spacingTokensDefinition["2XS"].rem,
  },
  variant: {
    Neutral: {
      background: colorTokensDefinition.SurfaceHigh,
      foreground: colorTokensDefinition.OnNeutral,
    },
    Positive: {
      background: colorTokensDefinition.SurfacePositive,
      foreground: colorTokensDefinition.OnNeutral,
    },
    Negative: {
      background: colorTokensDefinition.SurfaceNegative,
      foreground: colorTokensDefinition.OnNeutral,
    },
  },
} as const;

export const tabsTokens = {
  gap: spacingTokensDefinition["2XS"].rem,
  listBorderColor: colorTokensDefinition.Outline,
  listBorderWidth: spacingTokensDefinition["4XS"].rem,
  tab: {
    typography: typographyTokensDefinition["body-m"],
    paddingY: spacingTokensDefinition.XS.rem,
    paddingX: spacingTokensDefinition.S.rem,
    color: colorTokensDefinition.InverseActive,
    colorHover: colorTokensDefinition.OnNeutral,
    colorSelected: colorTokensDefinition.Inverse,
    colorDisabled: colorTokensDefinition.InverseActive,
    indicatorColor: colorTokensDefinition.Inverse,
    indicatorHeight: spacingTokensDefinition["4XS"].rem,
    focusRingColor: colorTokensDefinition.Outline,
    focusRingWidth: spacingTokensDefinition["4XS"].rem,
    focusRingOffset: spacingTokensDefinition["3XS"].rem,
    surfaceHover: colorTokensDefinition.SurfaceHover,
  },
  panel: {
    paddingY: spacingTokensDefinition.L.rem,
    color: colorTokensDefinition.OnNeutral,
  },
} as const;

export const component = {
  button: buttonTokens,
  badge: badgeTokens,
  tabs: tabsTokens,
} as const;

export type ComponentTokens = typeof component;

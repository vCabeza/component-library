export const spacingTokensDefinition = {
  "0": { px: 0, rem: "0" },
  "4XS": { px: 2, rem: "0.125rem" },
  /** Underline indicator height / bottom padding (Figma 3px). */
  TabIndicator: { px: 3, rem: "0.1875rem" },
  "3XS": { px: 4, rem: "0.25rem" },
  "2XS": { px: 8, rem: "0.5rem" },
  XS: { px: 12, rem: "0.75rem" },
  S: { px: 16, rem: "1rem" },
  /** Badge mobile height (Figma Mobile=True). */
  BadgeMobileHeight: { px: 22, rem: "1.375rem" },
  M: { px: 20, rem: "1.25rem" },
  L: { px: 24, rem: "1.5rem" },
  /** Badge desktop height (Figma Mobile=False). */
  BadgeDesktopHeight: { px: 26, rem: "1.625rem" },
  XL: { px: 32, rem: "2rem" },
  /** Tab mobile height (Figma Mobile=True). */
  TabMobileHeight: { px: 42, rem: "2.625rem" },
  "2XL": { px: 48, rem: "3rem" },
  /** Tab desktop height (Figma Mobile=False). */
  TabDesktopHeight: { px: 50, rem: "3.125rem" },
  /** Pill tab border-radius (Figma 100px). */
  Pill: { px: 100, rem: "6.25rem" },
} as const;

export type SpacingToken = keyof typeof spacingTokensDefinition;

export const spacingTokenOrder = [
  "0",
  "4XS",
  "TabIndicator",
  "3XS",
  "2XS",
  "XS",
  "S",
  "BadgeMobileHeight",
  "M",
  "L",
  "BadgeDesktopHeight",
  "XL",
  "TabMobileHeight",
  "2XL",
  "TabDesktopHeight",
  "Pill",
] as const satisfies ReadonlyArray<SpacingToken>;

/** Prefer rem for CSS consumption. */
export function spacingCss(token: SpacingToken): string {
  return spacingTokensDefinition[token].rem;
}

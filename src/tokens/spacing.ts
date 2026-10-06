export const spacingTokensDefinition = {
  "0": { px: 0, rem: "0" },
  "4XS": { px: 2, rem: "0.125rem" },
  "3XS": { px: 4, rem: "0.25rem" },
  "2XS": { px: 8, rem: "0.5rem" },
  XS: { px: 12, rem: "0.75rem" },
  S: { px: 16, rem: "1rem" },
  /** Badge mobile height (Figma Mobile=True). */
  "BadgeMobileHeight": { px: 22, rem: "1.375rem" },
  M: { px: 20, rem: "1.25rem" },
  L: { px: 24, rem: "1.5rem" },
  /** Badge desktop height (Figma Mobile=False). */
  "BadgeDesktopHeight": { px: 26, rem: "1.625rem" },
  XL: { px: 32, rem: "2rem" },
  "2XL": { px: 48, rem: "3rem" },
} as const;

export type SpacingToken = keyof typeof spacingTokensDefinition;

export const spacingTokenOrder = [
  "0",
  "4XS",
  "3XS",
  "2XS",
  "XS",
  "S",
  "BadgeMobileHeight",
  "M",
  "L",
  "BadgeDesktopHeight",
  "XL",
  "2XL",
] as const satisfies ReadonlyArray<SpacingToken>;

/** Prefer rem for CSS consumption. */
export function spacingCss(token: SpacingToken): string {
  return spacingTokensDefinition[token].rem;
}

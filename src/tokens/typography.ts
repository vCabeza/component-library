export const fontWeightTokensDefinition = {
  bold: 700,
} as const;

export type FontWeightToken = keyof typeof fontWeightTokensDefinition;

export const typographyTokensDefinition = {
  "body-m": {
    fontSize: "0.875rem",
    lineHeight: 1.5,
    fontFamily: "'Inter', sans-serif",
  },
  "body-s": {
    fontSize: "0.75rem",
    lineHeight: 1.5,
    fontFamily: "'Inter', sans-serif",
  },
} as const;

export type TypographyToken = keyof typeof typographyTokensDefinition;

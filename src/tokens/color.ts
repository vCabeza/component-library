export const colorTokensDefinition = {
  SurfaceHigh: "#F1F1F7",
  SurfacePositive: "#B1FFC7",
  SurfaceNegative: "#FFBFB1",
  Inverse: "#1B2134",
  InverseHover: "#343A4E",
  InverseActive: "#585D71",
  SurfaceHover: "#F6F6FA",
  SurfaceActive: "#F1F1F7",
  Outline: "#D3D3DC",
  /** Tab Pill unselected hover border / Underline hover indicator (Figma). */
  OutlineHover: "#C4C5CF",
  OnNeutral: "#1B2134",
  OnInverse: "#FFFFFF",
  /** Tab Pill unselected focus-ring (Figma). */
  Black: "#000000",
} as const;

export type ColorToken = keyof typeof colorTokensDefinition;

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
  /** Figma Tab Pill unselected hover border / Underline hover indicator */
  OutlineHover: "#C4C5CF",
  OnNeutral: "#1B2134",
  OnInverse: "#FFFFFF",
  /** Figma Tab Pill unselected focus-ring */
  Black: "#000000",
} as const;

export type ColorToken = keyof typeof colorTokensDefinition;

import { describe, expect, it } from "vitest";
import {
  colorTokensDefinition,
  fontWeightTokensDefinition,
  spacingCss,
  spacingTokenOrder,
  spacingTokensDefinition,
  typographyTokensDefinition,
} from "../index";

describe("Figma token definitions", () => {
  it("matches Figma color tokens exactly", () => {
    expect(colorTokensDefinition).toEqual({
      SurfaceHigh: "#F1F1F7",
      SurfacePositive: "#B1FFC7",
      SurfaceNegative: "#FFBFB1",
      Inverse: "#1B2134",
      InverseHover: "#343A4E",
      InverseActive: "#585D71",
      SurfaceHover: "#F6F6FA",
      SurfaceActive: "#F1F1F7",
      Outline: "#D3D3DC",
      OutlineHover: "#C4C5CF",
      OnNeutral: "#1B2134",
      OnInverse: "#FFFFFF",
      Black: "#000000",
    });
  });

  it("matches Figma spacing tokens and order", () => {
    expect(spacingTokensDefinition).toEqual({
      "0": { px: 0, rem: "0" },
      "4XS": { px: 2, rem: "0.125rem" },
      TabIndicator: { px: 3, rem: "0.1875rem" },
      "3XS": { px: 4, rem: "0.25rem" },
      "2XS": { px: 8, rem: "0.5rem" },
      XS: { px: 12, rem: "0.75rem" },
      S: { px: 16, rem: "1rem" },
      BadgeMobileHeight: { px: 22, rem: "1.375rem" },
      M: { px: 20, rem: "1.25rem" },
      L: { px: 24, rem: "1.5rem" },
      BadgeDesktopHeight: { px: 26, rem: "1.625rem" },
      XL: { px: 32, rem: "2rem" },
      TabMobileHeight: { px: 42, rem: "2.625rem" },
      "2XL": { px: 48, rem: "3rem" },
      TabDesktopHeight: { px: 50, rem: "3.125rem" },
      Pill: { px: 100, rem: "6.25rem" },
    });
    expect(spacingTokenOrder).toEqual([
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
    ]);
    expect(spacingCss("S")).toBe("1rem");
  });

  it("matches Figma typography tokens exactly", () => {
    expect(typographyTokensDefinition).toEqual({
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
    });
  });

  it("exposes fontWeight bold token (700)", () => {
    expect(fontWeightTokensDefinition.bold).toBe(700);
  });
});

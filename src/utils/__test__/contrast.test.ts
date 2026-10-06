import { describe, expect, it } from "vitest";
import {
  contrastRatio,
  parseHexColor,
  relativeLuminance,
  roundContrastRatio,
} from "../a11y";
import { theme } from "../../theme";

const TEXT_AA = 4.5;
const UI_AA = 3;

type ContrastPair = {
  name: string;
  foreground: string;
  background: string;
  minAa: number;
  kind: "text" | "ui";
};

function ratioOf(fg: string, bg: string): number {
  const ratio = contrastRatio(fg, bg);
  if (ratio == null) {
    throw new Error(`Unparseable contrast pair: ${fg} on ${bg}`);
  }
  return roundContrastRatio(ratio);
}

describe("a11y contrast helpers", () => {
  it("parses 6-digit and 3-digit hex", () => {
    expect(parseHexColor("#FFFFFF")).toEqual({ r: 1, g: 1, b: 1 });
    expect(parseHexColor("#000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(parseHexColor("transparent")).toBeNull();
  });

  it("computes black-on-white as 21:1", () => {
    expect(roundContrastRatio(contrastRatio("#000000", "#FFFFFF")!)).toBe(21);
    expect(relativeLuminance("#FFFFFF")).toBeCloseTo(1, 5);
    expect(relativeLuminance("#000000")).toBeCloseTo(0, 5);
  });
});

describe("Figma token contrast matrix (document gaps; do not override tokens)", () => {
  const button = theme.component.button;
  const badge = theme.component.badge;
  const tabs = theme.component.tabs;
  const white = "#FFFFFF";

  const pairs: ContrastPair[] = [
    {
      name: "Button primary text",
      foreground: button.variant.primary.foreground,
      background: button.variant.primary.background,
      minAa: TEXT_AA,
      kind: "text",
    },
    {
      name: "Button secondary text",
      foreground: button.variant.secondary.foreground,
      background: button.variant.secondary.background,
      minAa: TEXT_AA,
      kind: "text",
    },
    {
      name: "Button disabled text",
      foreground: button.disabled.foreground,
      background: button.disabled.background,
      minAa: TEXT_AA,
      kind: "text",
    },
    {
      name: "Badge Neutral text",
      foreground: badge.variant.Neutral.foreground,
      background: badge.variant.Neutral.background,
      minAa: TEXT_AA,
      kind: "text",
    },
    {
      name: "Badge Positive text",
      foreground: badge.variant.Positive.foreground,
      background: badge.variant.Positive.background,
      minAa: TEXT_AA,
      kind: "text",
    },
    {
      name: "Badge Negative text",
      foreground: badge.variant.Negative.foreground,
      background: badge.variant.Negative.background,
      minAa: TEXT_AA,
      kind: "text",
    },
    {
      name: "Tab Pill selected text",
      foreground: tabs.pill.selected.foreground,
      background: tabs.pill.selected.background,
      minAa: TEXT_AA,
      kind: "text",
    },
    {
      name: "Tab Pill unselected text on white",
      foreground: tabs.pill.unselected.foreground,
      background: white,
      minAa: TEXT_AA,
      kind: "text",
    },
    {
      name: "Focus ring Outline on white (UI)",
      foreground: theme.focus.ring,
      background: white,
      minAa: UI_AA,
      kind: "ui",
    },
    {
      name: "Focus ring Outline on SurfaceHigh (UI)",
      foreground: theme.focus.ring,
      background: theme.color.SurfaceHigh,
      minAa: UI_AA,
      kind: "ui",
    },
    {
      name: "Tab Pill unselected focus ring Black on white (UI)",
      foreground: tabs.pill.unselected.focusRing,
      background: white,
      minAa: UI_AA,
      kind: "ui",
    },
    {
      name: "Tab underline indicator selected on white (UI)",
      foreground: tabs.underline.indicator.selected,
      background: white,
      minAa: UI_AA,
      kind: "ui",
    },
  ];

  it.each(pairs)(
    "$name → records ratio (AA threshold $minAa:1 is informational)",
    ({ name, foreground, background, minAa }) => {
      const ratio = ratioOf(foreground, background);
      expect(ratio).toBeGreaterThan(1);
      expect({ name, foreground, background, ratio, minAa }).toMatchObject({
        name,
        ratio: expect.any(Number),
        minAa,
      });
    },
  );

  /**
   * Figma-first: do not change tokens to “fix” these; they document known AA gaps.
   */
  it("documentsKnownContrastGap: Button focus ring Outline on white is below 3:1 UI AA", () => {
    const ratio = ratioOf(theme.focus.ring, white);
    expect(ratio).toBeLessThan(UI_AA);
    expect(ratio).toBe(1.49);
  });

  it("documentsKnownContrastGap: Button focus ring Outline on SurfaceHigh is below 3:1 UI AA", () => {
    const ratio = ratioOf(theme.focus.ring, theme.color.SurfaceHigh);
    expect(ratio).toBeLessThan(UI_AA);
  });
});

describe("Focus ring token size (Figma; audit only)", () => {
  it("exposes non-zero width and offset from theme tokens", () => {
    expect(theme.focus.ringWidth).toBe(theme.spacing["4XS"].rem);
    expect(theme.focus.ringOffset).toBe(theme.spacing["3XS"].rem);
    expect(theme.component.tabs.focusRingWidth).toBe(theme.spacing["4XS"].rem);
    expect(theme.component.tabs.focusRingOffset).toBe(
      theme.spacing["3XS"].rem,
    );
  });

  it("documents focus ring width as 2px (4XS) — perimeter size is token-driven, not enlarged", () => {
    expect(theme.spacing["4XS"].px).toBe(2);
    expect(theme.spacing["3XS"].px).toBe(4);
  });
});

describe("Target size tokens (Figma; document gaps, do not enlarge)", () => {
  it("Tab desktop/mobile heights meet 24px minimum CSS px", () => {
    expect(theme.spacing.TabDesktopHeight.px).toBeGreaterThanOrEqual(24);
    expect(theme.spacing.TabMobileHeight.px).toBeGreaterThanOrEqual(24);
  });

  it("documentsKnownTargetSizeGap: Badge mobile height is below 24px (non-interactive chrome)", () => {
    expect(theme.spacing.BadgeMobileHeight.px).toBeLessThan(24);
    expect(theme.spacing.BadgeMobileHeight.px).toBe(22);
  });

  it("documents body-s font size remains Figma 0.75rem (consumer zoom owns readability)", () => {
    expect(theme.typography["body-s"].fontSize).toBe("0.75rem");
    expect(theme.typography["body-m"].fontSize).toBe("0.875rem");
  });
});

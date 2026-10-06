import type { DefaultTheme, RuleSet } from "styled-components";
import { css } from "styled-components";

let idCounter = 0;

export function createId(prefix = "ds"): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/** Reset for tests only. */
export function resetIdCounter(): void {
  idCounter = 0;
}

export function focusVisibleRing(
  theme: DefaultTheme,
  options?: { width?: string; offset?: string; color?: string },
): RuleSet {
  const width = options?.width ?? theme.focus.ringWidth;
  const offset = options?.offset ?? theme.focus.ringOffset;
  const color = options?.color ?? theme.focus.ring;

  return css`
    &:focus-visible {
      outline: ${width} solid ${color};
      outline-offset: ${offset};
    }
  `;
}

export function parseHexColor(
  hex: string,
): { r: number; g: number; b: number } | null {
  const raw = hex.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(raw)) {
    return null;
  }
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;
  const int = Number.parseInt(full, 16);
  return {
    r: ((int >> 16) & 255) / 255,
    g: ((int >> 8) & 255) / 255,
    b: (int & 255) / 255,
  };
}

function linearizeChannel(c: number): number {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number | null {
  const rgb = parseHexColor(hex);
  if (!rgb) return null;
  const r = linearizeChannel(rgb.r);
  const g = linearizeChannel(rgb.g);
  const b = linearizeChannel(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Returns null if either color is not a parseable hex (e.g. `transparent`). */
export function contrastRatio(foreground: string, background: string): number | null {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  if (l1 == null || l2 == null) return null;
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function roundContrastRatio(ratio: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(ratio * factor) / factor;
}

export function forcedColorsInteractive(): RuleSet {
  return css`
    @media (forced-colors: active) {
      forced-color-adjust: none;
      border: 1px solid ButtonText;
      color: ButtonText;
      background-color: ButtonFace;
      outline-color: Highlight;

      &:focus-visible {
        outline: 2px solid Highlight;
        outline-offset: 2px;
      }

      &:disabled {
        border-color: GrayText;
        color: GrayText;
      }
    }
  `;
}

export function forcedColorsChrome(): RuleSet {
  return css`
    @media (forced-colors: active) {
      forced-color-adjust: none;
      color: CanvasText;
      background-color: Canvas;
      border: 1px solid CanvasText;
    }
  `;
}

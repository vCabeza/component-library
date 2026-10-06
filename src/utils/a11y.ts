import type { DefaultTheme, RuleSet } from "styled-components";
import { css } from "styled-components";

let idCounter = 0;

/**
 * Generates a stable unique id prefix for composing accessible relationships
 * (e.g. aria-controls / aria-labelledby) outside of React's useId when needed.
 */
export function createId(prefix = "ds"): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/** Reset for tests only. */
export function resetIdCounter(): void {
  idCounter = 0;
}

/**
 * Reusable :focus-visible ring driven by theme tokens (no hardcoded hex).
 */
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

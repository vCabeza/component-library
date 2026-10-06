import { createGlobalStyle } from "styled-components";

/**
 * Optional minimal globals. Prefer component-level focus styles;
 * this only softens default outlines when a theme focus ring is used.
 */
export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }
`;

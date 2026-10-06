import { type ReactNode } from "react";
import {
  ThemeProvider as StyledThemeProvider,
  type DefaultTheme,
} from "styled-components";
import { theme as defaultTheme } from "./theme";

export type ThemeProviderProps = {
  children: ReactNode;
  theme?: DefaultTheme;
};

export function ThemeProvider({
  children,
  theme = defaultTheme,
}: ThemeProviderProps) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}

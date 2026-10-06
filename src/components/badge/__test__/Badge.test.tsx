import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import Badge from "../Badge";
import { renderWithTheme } from "../../../test-utils/render";
import { theme } from "../../../theme";

describe("Badge", () => {
  it("renders children text", () => {
    renderWithTheme(<Badge>Badge</Badge>);
    expect(screen.getByText("Badge")).toBeInTheDocument();
  });

  it("defaults to Neutral variant styles and data-variant", () => {
    renderWithTheme(<Badge>Badge</Badge>);
    const badge = screen.getByText("Badge");
    expect(badge).toHaveAttribute("data-variant", "Neutral");
    expect(badge).toHaveStyle({
      backgroundColor: theme.component.badge.variant.Neutral.background,
      color: theme.component.badge.variant.Neutral.foreground,
    });
  });

  it("applies Positive variant styles", () => {
    renderWithTheme(<Badge variant="Positive">Ok</Badge>);
    const badge = screen.getByText("Ok");
    expect(badge).toHaveAttribute("data-variant", "Positive");
    expect(badge).toHaveStyle({
      backgroundColor: theme.component.badge.variant.Positive.background,
      color: theme.component.badge.variant.Positive.foreground,
    });
  });

  it("applies Negative variant styles", () => {
    renderWithTheme(<Badge variant="Negative">Alert</Badge>);
    const badge = screen.getByText("Alert");
    expect(badge).toHaveAttribute("data-variant", "Negative");
    expect(badge).toHaveStyle({
      backgroundColor: theme.component.badge.variant.Negative.background,
      color: theme.component.badge.variant.Negative.foreground,
    });
  });

  it("forwards ref to the span element", () => {
    const ref = createRef<HTMLSpanElement>();
    renderWithTheme(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveTextContent("Ref");
  });

  it("exposes badge typography and weight tokens", () => {
    expect(theme.component.badge.typography.fontSize).toBe("0.75rem");
    expect(theme.component.badge.fontWeight).toBe(700);
    expect(theme.component.badge.desktop.height).toBe("1.625rem");
    expect(theme.component.badge.mobile.height).toBe("1.375rem");
  });

  it("has no serious accessibility violations", async () => {
    const { container } = renderWithTheme(
      <Badge variant="Neutral">Accessible</Badge>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

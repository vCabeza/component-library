import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import userEvent from "@testing-library/user-event";
import Button from "../Button";
import { renderWithTheme } from "../../../test-utils/render";
import { theme } from "../../../theme";

describe("Button", () => {
  it("renders with an accessible name from children", () => {
    renderWithTheme(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("defaults to type=button", () => {
    renderWithTheme(<Button>Action</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("calls onClick when enabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole("button", { name: "Click me" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    await user.click(screen.getByRole("button", { name: "Disabled" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("exposes disabled state to the accessibility tree", () => {
    renderWithTheme(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });

  it("applies primary variant styles from tokens", () => {
    renderWithTheme(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole("button", { name: "Primary" });
    expect(button).toHaveStyle({
      backgroundColor: theme.component.button.variant.primary.background,
      color: theme.component.button.variant.primary.foreground,
    });
  });

  it("applies secondary variant styles from tokens", () => {
    renderWithTheme(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button", { name: "Secondary" });
    expect(button).toHaveStyle({
      backgroundColor: theme.component.button.variant.secondary.background,
      color: theme.component.button.variant.secondary.foreground,
    });
  });

  it("applies size typography tokens for large", () => {
    renderWithTheme(<Button size="large">Large</Button>);
    const button = screen.getByRole("button", { name: "Large" });
    expect(button).toHaveStyle({
      fontSize: theme.component.button.size.large.typography.fontSize,
    });
  });

  it("exposes focus ring tokens on the theme for keyboard users", () => {
    expect(theme.component.button.focusRingColor).toBe(theme.focus.ring);
    expect(theme.component.button.focusRingWidth).toBeTruthy();
    expect(theme.component.button.focusRingOffset).toBeTruthy();
  });

  it("has no serious accessibility violations", async () => {
    const { container } = renderWithTheme(
      <Button variant="primary">Accessible</Button>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

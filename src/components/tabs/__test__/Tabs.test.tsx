import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Tabs, TabList, TabPanel } from "../Tabs";
import { Tab } from "../../tab";
import { renderWithTheme } from "../../../test-utils/render";

function Demo({
  variant = "Pill" as const,
  defaultSelectedKey = "a",
  selectedKey,
  onSelectionChange,
}: {
  variant?: "Pill" | "Underline";
  defaultSelectedKey?: string;
  selectedKey?: string;
  onSelectionChange?: (key: string) => void;
}) {
  return (
    <Tabs
      variant={variant}
      defaultSelectedKey={selectedKey === undefined ? defaultSelectedKey : undefined}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      aria-label="Demo tabs"
    >
      <TabList>
        <Tab id="a">Alpha</Tab>
        <Tab id="b">Beta</Tab>
        <Tab id="c">Gamma</Tab>
      </TabList>
      <TabPanel id="a">Panel A</TabPanel>
      <TabPanel id="b">Panel B</TabPanel>
      <TabPanel id="c">Panel C</TabPanel>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders tablist and shows the default selected panel", () => {
    renderWithTheme(<Demo />);
    expect(screen.getByRole("tablist", { name: "Demo tabs" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel A");
    expect(screen.queryByText("Panel B")).not.toBeInTheDocument();
  });

  it("switches panels on tab click (uncontrolled)", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Demo />);
    await user.click(screen.getByRole("tab", { name: "Beta" }));
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel B");
  });

  it("supports controlled selection", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    const { rerender } = renderWithTheme(
      <Demo selectedKey="a" onSelectionChange={onSelectionChange} />,
    );
    await user.click(screen.getByRole("tab", { name: "Gamma" }));
    expect(onSelectionChange).toHaveBeenCalledWith("c");
    rerender(
      <Demo selectedKey="c" onSelectionChange={onSelectionChange} />,
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel C");
  });

  it("exposes data-variant on Tabs and TabList", () => {
    renderWithTheme(<Demo variant="Underline" />);
    expect(screen.getByRole("tablist").closest("[data-variant]")).toHaveAttribute(
      "data-variant",
      "Underline",
    );
    expect(screen.getByRole("tablist")).toHaveAttribute(
      "data-variant",
      "Underline",
    );
  });

  it("navigates with ArrowRight / ArrowLeft / Home / End", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Demo />);
    const alpha = screen.getByRole("tab", { name: "Alpha" });
    alpha.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Gamma" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Gamma" })).toHaveFocus();
  });

  it("defaults selection to the first enabled tab when none is provided", () => {
    renderWithTheme(
      <Tabs aria-label="No default">
        <TabList>
          <Tab id="a">Alpha</Tab>
          <Tab id="b">Beta</Tab>
        </TabList>
        <TabPanel id="a">Panel A</TabPanel>
        <TabPanel id="b">Panel B</TabPanel>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute(
      "tabIndex",
      "0",
    );
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute(
      "tabIndex",
      "0",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel A");
  });

  it("lets Tab key move focus across every tab, then into the panel", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Demo />);
    await user.tab();
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("tab", { name: "Gamma" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("tabpanel")).toHaveFocus();
  });

  it("selects a tab with Enter after focusing it with Tab", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Demo />);
    await user.tab();
    await user.tab();
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel B");
  });

  it("wires aria-controls / aria-labelledby between Tab and TabPanel", () => {
    renderWithTheme(<Demo />);
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute(
      "aria-controls",
      "panel-a",
    );
    expect(screen.getByRole("tabpanel")).toHaveAttribute("id", "panel-a");
    expect(screen.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      "a",
    );
  });

  it("sets aria-orientation horizontal on the tablist", () => {
    renderWithTheme(<Demo />);
    expect(screen.getByRole("tablist")).toHaveAttribute(
      "aria-orientation",
      "horizontal",
    );
  });

  it("has no serious accessibility violations", async () => {
    const { container } = renderWithTheme(<Demo />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

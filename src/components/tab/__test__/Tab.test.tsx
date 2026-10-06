import { describe, expect, it, vi } from "vitest";
import { createRef } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import Tab from "../Tab";
import { Tabs, TabList, TabPanel } from "../../tabs";
import { renderWithTheme } from "../../../test-utils/render";
import { theme } from "../../../theme";

describe("Tab", () => {
  it("renders as a tab button with accessible name", () => {
    renderWithTheme(
      <Tab id="overview" isSelected>
        Overview
      </Tab>,
    );
    const tab = screen.getByRole("tab", { name: "Overview" });
    expect(tab).toHaveAttribute("type", "button");
    expect(tab).toHaveAttribute("id", "overview");
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(tab).toHaveAttribute("aria-controls", "panel-overview");
    expect(tab).toHaveAttribute("tabIndex", "0");
  });

  it("keeps standalone unselected tabs in the sequential tab order", () => {
    renderWithTheme(
      <Tab id="details" isSelected={false}>
        Details
      </Tab>,
    );
    const tab = screen.getByRole("tab", { name: "Details" });
    expect(tab).toHaveAttribute("aria-selected", "false");
    expect(tab).toHaveAttribute("tabIndex", "0");
  });

  it("defaults variant to Pill", () => {
    renderWithTheme(<Tab id="a">Label</Tab>);
    expect(screen.getByRole("tab")).toHaveAttribute("data-variant", "Pill");
  });

  it("inherits variant and selection from Tabs context", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Tabs variant="Underline" defaultSelectedKey="a" aria-label="Demo">
        <TabList>
          <Tab id="a">One</Tab>
          <Tab id="b">Two</Tab>
        </TabList>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "data-variant",
      "Underline",
    );
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await user.click(screen.getByRole("tab", { name: "Two" }));
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("prop variant overrides Tabs context variant", () => {
    renderWithTheme(
      <Tabs variant="Underline" defaultSelectedKey="a">
        <TabList>
          <Tab id="a" variant="Pill">
            Label
          </Tab>
        </TabList>
      </Tabs>,
    );
    expect(screen.getByRole("tab")).toHaveAttribute("data-variant", "Pill");
  });

  it("keeps badge text OnNeutral when Pill Tab is selected (no color leak)", () => {
    renderWithTheme(
      <Tab id="a" variant="Pill" isSelected badge="3">
        Label
      </Tab>,
    );
    const badgeText = screen.getByText("3");
    expect(badgeText).toHaveStyle({
      color: theme.component.tabs.badgeSlot.foreground,
    });
    expect(theme.component.tabs.badgeSlot.foreground).toBe(
      theme.component.tabs.pill.unselected.foreground,
    );
    expect(theme.component.tabs.badgeSlot.foreground).not.toBe(
      theme.component.tabs.pill.selected.foreground,
    );
  });

  it("applies Pill selected background from tokens", () => {
    renderWithTheme(
      <Tab id="a" variant="Pill" isSelected>
        Selected
      </Tab>,
    );
    expect(screen.getByRole("tab")).toHaveStyle({
      backgroundColor: theme.component.tabs.pill.selected.background,
      color: theme.component.tabs.pill.selected.foreground,
    });
  });

  it("calls onClick when pressed", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <Tab id="a" onClick={onClick}>
        Click
      </Tab>,
    );
    await user.click(screen.getByRole("tab", { name: "Click" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("forwards ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTheme(
      <Tab id="a" ref={ref}>
        Ref
      </Tab>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("keeps every enabled tab in the sequential tab order inside Tabs", () => {
    renderWithTheme(
      <Tabs defaultSelectedKey="b" aria-label="Demo">
        <TabList>
          <Tab id="a">One</Tab>
          <Tab id="b">Two</Tab>
          <Tab id="c">Three</Tab>
        </TabList>
        <TabPanel id="a">A</TabPanel>
        <TabPanel id="b">B</TabPanel>
        <TabPanel id="c">C</TabPanel>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "tabIndex",
      "0",
    );
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "tabIndex",
      "0",
    );
    expect(screen.getByRole("tab", { name: "Three" })).toHaveAttribute(
      "tabIndex",
      "0",
    );
  });

  it("selects the first enabled tab when Tabs has no initial selection", () => {
    renderWithTheme(
      <Tabs aria-label="Demo">
        <TabList>
          <Tab id="a">One</Tab>
          <Tab id="b">Two</Tab>
        </TabList>
        <TabPanel id="a">A</TabPanel>
        <TabPanel id="b">B</TabPanel>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "tabIndex",
      "0",
    );
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "tabIndex",
      "0",
    );
  });

  it("moves selection with ArrowRight when focus is on a Tab", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Tabs defaultSelectedKey="a" aria-label="Demo">
        <TabList>
          <Tab id="a">One</Tab>
          <Tab id="b">Two</Tab>
        </TabList>
        <TabPanel id="a">A</TabPanel>
        <TabPanel id="b">B</TabPanel>
      </Tabs>,
    );
    screen.getByRole("tab", { name: "One" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
  });

  it("has no serious accessibility violations", async () => {
    const { container } = renderWithTheme(
      <Tabs defaultSelectedKey="a" aria-label="Demo">
        <TabList>
          <Tab id="a">One</Tab>
          <Tab id="b">Two</Tab>
        </TabList>
        <TabPanel id="a">Panel one</TabPanel>
        <TabPanel id="b">Panel two</TabPanel>
      </Tabs>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

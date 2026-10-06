import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Example from "./Example";

const meta: Meta<typeof Example> = {
  title: "Tab",
  component: Example,
  args: {
    id: "overview",
    children: "Overview",
    variant: "Pill",
    isSelected: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["Pill", "Underline"],
    },
    isSelected: { control: "boolean" },
    children: { control: "text" },
    badge: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Example>;

export const PillUnselected: Story = {
  args: { variant: "Pill", isSelected: false },
};

export const PillSelected: Story = {
  args: { variant: "Pill", isSelected: true },
};

export const UnderlineUnselected: Story = {
  args: { variant: "Underline", isSelected: false },
};

export const UnderlineSelected: Story = {
  args: { variant: "Underline", isSelected: true },
};

export const WithBadge: Story = {
  args: { variant: "Pill", isSelected: false, badge: "3" },
};

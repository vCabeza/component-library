import type { Meta, StoryObj } from "@storybook/react-vite";
import Example from "./Example";

const meta: Meta<typeof Example> = {
  title: "Tabs",
  component: Example,
  args: {
    variant: "Pill",
    defaultSelectedKey: "overview",
    controlled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["Pill", "Underline"],
    },
    controlled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Pill: Story = {
  args: { variant: "Pill" },
};

export const Underline: Story = {
  args: { variant: "Underline" },
};

export const Controlled: Story = {
  args: { variant: "Pill", controlled: true },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Example from "./Example";

const meta: Meta<typeof Example> = {
  title: "Button",
  component: Example,
  args: {
    children: "Button",
    disabled: false,
    size: "medium",
    variant: "primary",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithChildren: Story = {
  args: {
    children: (
      <>
        <span aria-hidden="true">★</span>
        Label with icon
      </>
    ),
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import Example from "./Example";

const meta: Meta<typeof Example> = {
  title: "Badge",
  component: Example,
  args: {
    children: "Badge",
    variant: "Neutral",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["Neutral", "Positive", "Negative"],
    },
    children: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Static status badge. Desktop (≥769px) and Mobile (≤768px) sizes are viewport-driven via CSS media queries — there is no size/mobile prop.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Neutral: Story = {
  args: {
    variant: "Neutral",
  },
};

export const Positive: Story = {
  args: {
    variant: "Positive",
  },
};

export const Negative: Story = {
  args: {
    variant: "Negative",
  },
};

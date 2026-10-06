import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Foundations/Accessibility",
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {
  name: "Overview",
  render: () => (
    <p>
      See the <strong>Docs</strong> tab for keyboard patterns, Figma contrast
      gaps, forced-colors notes, and the VoiceOver / NVDA checklist.
    </p>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ColorTokensView,
  ComponentTokensView,
  SemanticTokensView,
  SpacingTokensView,
  TypographyTokensView,
} from "./TokenViews";

const meta: Meta = {
  title: "Foundations/Tokens",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

export const Color: Story = {
  name: "Color",
  render: () => <ColorTokensView />,
};

export const Spacing: Story = {
  name: "Spacing",
  render: () => <SpacingTokensView />,
};

export const Typography: Story = {
  name: "Typography",
  render: () => <TypographyTokensView />,
};

export const Semantic: Story = {
  name: "Semantic",
  render: () => <SemanticTokensView />,
};

export const Component: Story = {
  name: "Component",
  render: () => <ComponentTokensView />,
};

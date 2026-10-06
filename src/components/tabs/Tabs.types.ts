import type { HTMLAttributes, ReactNode } from "react";

/** Visual variants for Tabs / Tab — Figma: Pill | Underline. */
export type TabsVariant = "Pill" | "Underline";

export type TabsProps = {
  children: ReactNode;
  /** Visual variant shared with Tab children via context. Default: `"Pill"`. */
  variant?: TabsVariant;
  /** Controlled selected tab key (matches `Tab` / `TabPanel` `id`). */
  selectedKey?: string;
  /** Uncontrolled initial selected tab key. */
  defaultSelectedKey?: string;
  /** Called when selection changes. */
  onSelectionChange?: (key: string) => void;
  className?: string;
  "aria-label"?: string;
} & Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "defaultValue" | "onChange" | "color"
>;

export type TabListProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "color" | "role">;

export type TabPanelProps = {
  /** Selection key — must match the corresponding `Tab` `id`. */
  id: string;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "id" | "color" | "role">;

export type TabsContextValue = {
  variant: TabsVariant;
  selectedKey: string | undefined;
  setSelectedKey: (key: string) => void;
  "aria-label"?: string;
};

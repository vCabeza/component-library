import type { HTMLAttributes, ReactNode } from "react";

export type TabsVariant = "Pill" | "Underline";

export type TabsProps = {
  children: ReactNode;
  variant?: TabsVariant;
  selectedKey?: string;
  defaultSelectedKey?: string;
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
  /** Must match the corresponding `Tab` `id`. */
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

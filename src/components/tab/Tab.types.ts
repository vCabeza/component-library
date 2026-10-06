import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { TabsVariant } from "../tabs/Tabs.types";

/** @deprecated Prefer `TabsVariant` — kept as alias for Tab API clarity. */
export type TabVariant = TabsVariant;

export type TabProps = {
  /** Selection key — must match the corresponding `TabPanel` `id`. */
  id: string;
  children: ReactNode;
  badge?: ReactNode;
  /** Inherited from Tabs context when omitted. */
  variant?: TabVariant;
  /**
   * Standalone only. Inside `<Tabs>`, selection comes from context `selectedKey`.
   */
  isSelected?: boolean;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "id" | "type" | "color"
>;

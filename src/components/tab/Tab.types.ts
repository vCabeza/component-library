import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { TabsVariant } from "../tabs/Tabs.types";

/** @deprecated Prefer `TabsVariant` — kept as alias for Tab API clarity. */
export type TabVariant = TabsVariant;

/**
 * Public props for Tab.
 * Extends native button attributes (same philosophy as Button).
 */
export type TabProps = {
  /** Stable identity / selection key (matches `TabPanel` `id`). */
  id: string;
  /** Visible label content. */
  children: ReactNode;
  /** Optional badge slot rendered after the label. */
  badge?: ReactNode;
  /** Visual variant. Inherited from Tabs context when omitted. */
  variant?: TabVariant;
  /**
   * Selected state for standalone usage.
   * Inside `<Tabs>`, selection is derived from context `selectedKey`.
   */
  isSelected?: boolean;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "id" | "type" | "color"
>;

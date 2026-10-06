import { createContext, useContext } from "react";
import type { TabsContextValue } from "./Tabs.types";

export const TabsContext = createContext<TabsContextValue | null>(null);

/**
 * Required Tabs context — throws when used outside `<Tabs>`.
 */
export function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a <Tabs> provider.");
  }
  return context;
}

/**
 * Optional Tabs context — returns `null` when Tab/consumers are used standalone.
 */
export function useOptionalTabsContext(): TabsContextValue | null {
  return useContext(TabsContext);
}

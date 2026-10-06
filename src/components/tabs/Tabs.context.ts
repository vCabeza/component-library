import { createContext, useContext } from "react";
import type { TabsContextValue } from "./Tabs.types";

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a <Tabs> provider.");
  }
  return context;
}

/** Returns `null` when used outside `<Tabs>` (standalone Tab). */
export function useOptionalTabsContext(): TabsContextValue | null {
  return useContext(TabsContext);
}

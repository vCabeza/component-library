import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { TabListProps, TabPanelProps, TabsProps } from "./Tabs.types";
import { TabsContext, useTabsContext } from "./Tabs.context";
import { getEnabledTabs, getTabToSelectOnKeyDown } from "./tabsKeyboard";
import { StyledTabList, StyledTabPanel, StyledTabs } from "./Tabs.styles";

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    children,
    variant = "Pill",
    selectedKey: selectedKeyProp,
    defaultSelectedKey,
    onSelectionChange,
    className,
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const isControlled = selectedKeyProp !== undefined;
  const [uncontrolledKey, setUncontrolledKey] = useState<string | undefined>(
    defaultSelectedKey,
  );
  const selectedKey = isControlled ? selectedKeyProp : uncontrolledKey;

  const setSelectedKey = useCallback(
    (key: string) => {
      onSelectionChange?.(key);
      if (!isControlled) {
        setUncontrolledKey(key);
      }
    },
    [isControlled, onSelectionChange],
  );

  const contextValue = useMemo(
    () => ({
      variant,
      selectedKey,
      setSelectedKey,
      "aria-label": ariaLabel,
    }),
    [variant, selectedKey, setSelectedKey, ariaLabel],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <StyledTabs
        ref={ref}
        className={className}
        data-variant={variant}
        $variant={variant}
        {...rest}
      >
        {children}
      </StyledTabs>
    </TabsContext.Provider>
  );
});

Tabs.displayName = "Tabs";

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  function TabList(
    { children, className, "aria-label": ariaLabelProp, onKeyDown, ...rest },
    ref,
  ) {
    const { variant, selectedKey, setSelectedKey, "aria-label": ariaLabelCtx } =
      useTabsContext();
    const listRef = useRef<HTMLDivElement | null>(null);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        listRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    /**
     * If nothing is selected yet, select the first enabled tab so a panel
     * is visible and aria-selected is consistent.
     */
    useLayoutEffect(() => {
      if (selectedKey != null) return;
      const list = listRef.current;
      if (!list) return;
      const first = getEnabledTabs(list)[0];
      if (first?.id) {
        setSelectedKey(first.id);
      }
    }, [selectedKey, setSelectedKey, children]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      const list = listRef.current;
      if (!list) return;

      // Prefer Tab's own handler when a tab is focused; this is a fallback
      // (e.g. focus landed on the list chrome).
      const next = getTabToSelectOnKeyDown(event, list);
      if (!next?.id) return;

      setSelectedKey(next.id);
      queueMicrotask(() => next.focus());
    };

    return (
      <StyledTabList
        ref={setRefs}
        role="tablist"
        className={className}
        aria-label={ariaLabelProp ?? ariaLabelCtx}
        data-variant={variant}
        data-selected-key={selectedKey}
        $variant={variant}
        {...rest}
        onKeyDown={handleKeyDown}
      >
        {children}
      </StyledTabList>
    );
  },
);

TabList.displayName = "TabList";

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  function TabPanel({ id, children, className, ...rest }, ref) {
    const { selectedKey } = useTabsContext();
    const isActive = selectedKey === id;
    const panelDomId = `panel-${id}`;

    return (
      <StyledTabPanel
        ref={ref}
        id={panelDomId}
        role="tabpanel"
        tabIndex={0}
        hidden={!isActive}
        aria-labelledby={id}
        className={className}
        data-selected={isActive ? "true" : "false"}
        {...rest}
      >
        {isActive ? children : null}
      </StyledTabPanel>
    );
  },
);

TabPanel.displayName = "TabPanel";

export default Tabs;

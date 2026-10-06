import {
  forwardRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { TabProps, TabVariant } from "./Tab.types";
import { useOptionalTabsContext } from "../tabs/Tabs.context";
import { getTabToSelectOnKeyDown } from "../tabs/tabsKeyboard";
import { StyledTab, TabBadgeSlot, TabLabel } from "./Tab.styles";

function TabContent({
  children,
  badge,
}: {
  children: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <>
      <TabLabel>{children}</TabLabel>
      {badge != null ? <TabBadgeSlot>{badge}</TabBadgeSlot> : null}
    </>
  );
}

function resolveVariant(
  propVariant: TabVariant | undefined,
  contextVariant: TabVariant | undefined,
): TabVariant {
  return propVariant ?? contextVariant ?? "Pill";
}

function resolveTabIndex({
  tabIndexProp,
  disabled,
}: {
  tabIndexProp: number | undefined;
  disabled?: boolean;
}): number | undefined {
  if (tabIndexProp !== undefined) {
    return tabIndexProp;
  }
  if (disabled) {
    return undefined;
  }
  return 0;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  {
    id,
    children,
    badge,
    variant: variantProp,
    isSelected: isSelectedProp = false,
    className,
    disabled,
    onClick,
    onKeyDown,
    tabIndex: tabIndexProp,
    ...rest
  },
  ref,
) {
  const tabsContext = useOptionalTabsContext();
  const variant = resolveVariant(variantProp, tabsContext?.variant);
  const isInTabs = tabsContext != null;
  const isSelected = isInTabs
    ? tabsContext.selectedKey === id
    : isSelectedProp;

  const tabIndex = resolveTabIndex({
    tabIndexProp,
    disabled,
  });

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (isInTabs && !disabled) {
      tabsContext.setSelectedKey(id);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !isInTabs || disabled) return;

    const list = event.currentTarget.closest<HTMLElement>('[role="tablist"]');
    if (!list) return;

    const next = getTabToSelectOnKeyDown(event, list);
    if (!next?.id) return;

    tabsContext.setSelectedKey(next.id);
    queueMicrotask(() => next.focus());
  };

  return (
    <StyledTab
      ref={ref}
      id={id}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${id}`}
      tabIndex={tabIndex}
      disabled={disabled}
      className={className}
      data-variant={variant}
      data-selected={isSelected ? "true" : "false"}
      $variant={variant}
      $isSelected={isSelected}
      {...rest}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <TabContent badge={badge}>{children}</TabContent>
    </StyledTab>
  );
});

Tab.displayName = "Tab";

export default Tab;

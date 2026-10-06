import styled from "styled-components";
import type { TabsVariant } from "./Tabs.types";

type StyledTabsProps = {
  $variant: TabsVariant;
};

type StyledTabListProps = {
  $variant: TabsVariant;
};

export const StyledTabs = styled.div<StyledTabsProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

export const StyledTabList = styled.div<StyledTabListProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 0;
  height: ${({ theme }) => theme.component.tabs.desktop.height};
  gap: ${({ theme, $variant }) =>
    $variant === "Pill"
      ? theme.component.tabs.list.pill.desktop.gap
      : theme.component.tabs.list.underline.desktop.gap};

  @media (max-width: 768px) {
    height: ${({ theme }) => theme.component.tabs.mobile.height};
    gap: ${({ theme, $variant }) =>
      $variant === "Pill"
        ? theme.component.tabs.list.pill.mobile.gap
        : theme.component.tabs.list.underline.mobile.gap};
  }
`;

export const StyledTabPanel = styled.div`
  box-sizing: border-box;
  padding-top: ${({ theme }) => theme.component.tabs.panel.paddingY};
  color: ${({ theme }) => theme.component.tabs.panel.color};
  font-family: ${({ theme }) => theme.component.tabs.typography.fontFamily};
  font-size: ${({ theme }) => theme.component.tabs.typography.fontSize};
  line-height: ${({ theme }) => theme.component.tabs.typography.lineHeight};

  &[hidden] {
    display: none;
  }
`;

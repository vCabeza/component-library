import styled, { css } from "styled-components";
import type { TabVariant } from "./Tab.types";
import { forcedColorsInteractive } from "../../utils/a11y";

export type StyledTabProps = {
  $variant: TabVariant;
  $isSelected: boolean;
};

const pillSelectedStyles = css`
  ${({ theme }) => {
    const pill = theme.component.tabs.pill.selected;
    return css`
      background-color: ${pill.background};
      color: ${pill.foreground};
      border-color: transparent;

      &:hover {
        background-color: ${pill.backgroundHover};
        color: ${pill.foreground};
      }

      &:active {
        background-color: ${pill.backgroundActive};
        color: ${pill.foreground};
      }

      &:focus-visible {
        background-color: ${pill.background};
        color: ${pill.foreground};
        outline: ${theme.component.tabs.focusRingWidth} solid ${pill.focusRing};
        outline-offset: ${theme.component.tabs.focusRingOffset};
      }
    `;
  }}
`;

const pillUnselectedStyles = css`
  ${({ theme }) => {
    const pill = theme.component.tabs.pill.unselected;
    return css`
      background-color: ${pill.background};
      color: ${pill.foreground};
      border-color: ${pill.border};

      &:hover {
        background-color: ${pill.backgroundHover};
        border-color: ${pill.borderHover};
        color: ${pill.foreground};
      }

      &:active {
        background-color: ${pill.backgroundActive};
        border-color: ${pill.border};
        color: ${pill.foreground};
      }

      &:focus-visible {
        background-color: ${pill.background};
        border-color: ${pill.border};
        color: ${pill.foreground};
        outline: ${theme.component.tabs.focusRingWidth} solid ${pill.focusRing};
        outline-offset: ${theme.component.tabs.focusRingOffset};
      }
    `;
  }}
`;

const underlineBaseStyles = css`
  ${({ theme }) => {
    const underline = theme.component.tabs.underline;
    return css`
      background-color: transparent;
      color: ${underline.foreground};
      border-color: transparent;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: ${underline.indicator.height};
        border-radius: ${underline.indicator.radius};
        background-color: transparent;
      }

      &:focus-visible {
        outline: ${theme.component.tabs.focusRingWidth} solid
          ${underline.focusRing};
        outline-offset: ${theme.component.tabs.focusRingOffset};
        border-radius: ${underline.focusRadius};
      }
    `;
  }}
`;

const underlineSelectedStyles = css`
  ${({ theme }) => {
    const underline = theme.component.tabs.underline;
    return css`
      ${underlineBaseStyles}

      &::after {
        background-color: ${underline.indicator.selected};
      }
    `;
  }}
`;

const underlineUnselectedStyles = css`
  ${({ theme }) => {
    const underline = theme.component.tabs.underline;
    return css`
      ${underlineBaseStyles}

      &:hover::after,
      &:active::after,
      &:focus-visible::after {
        background-color: ${underline.indicator.unselectedInteractive};
      }
    `;
  }}
`;

export const StyledTab = styled.button<StyledTabProps>`
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
  cursor: pointer;
  appearance: none;
  text-decoration: none;
  border-style: solid;
  border-width: ${({ $variant }) => ($variant === "Pill" ? "1px" : "0")};
  font-family: ${({ theme }) => theme.component.tabs.typography.fontFamily};
  font-size: ${({ theme }) => theme.component.tabs.typography.fontSize};
  line-height: ${({ theme }) => theme.component.tabs.typography.lineHeight};
  font-weight: ${({ theme }) => theme.component.tabs.fontWeight};
  white-space: nowrap;

  height: ${({ theme }) => theme.component.tabs.desktop.height};
  gap: ${({ theme }) => theme.component.tabs.desktop.itemGap};
  border-radius: ${({ theme, $variant }) =>
    $variant === "Pill" ? theme.component.tabs.pill.radius : "0"};
  padding: ${({ theme, $variant }) =>
    $variant === "Pill"
      ? `0 ${theme.component.tabs.pill.desktop.paddingX}`
      : `0 0 ${theme.component.tabs.underline.desktop.paddingBottom} 0`};

  ${({ $variant, $isSelected }) => {
    if ($variant === "Pill") {
      return $isSelected ? pillSelectedStyles : pillUnselectedStyles;
    }
    return $isSelected ? underlineSelectedStyles : underlineUnselectedStyles;
  }}

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.color.disabled.foreground};
    background-color: ${({ theme }) => theme.color.disabled.background};
    border-color: ${({ theme }) => theme.color.disabled.border};
    border-style: solid;
    border-width: 1px;

    &::after {
      background-color: transparent;
    }
  }

  ${forcedColorsInteractive}

  @media (max-width: 768px) {
    height: ${({ theme }) => theme.component.tabs.mobile.height};
    gap: ${({ theme }) => theme.component.tabs.mobile.itemGap};
    padding: ${({ theme, $variant }) =>
      $variant === "Pill"
        ? `0 ${theme.component.tabs.pill.mobile.paddingX}`
        : `0 0 ${theme.component.tabs.underline.mobile.paddingBottom} 0`};
  }
`;

export const TabLabel = styled.span`
  display: inline-flex;
  align-items: center;
`;

/**
 * Isolates badge text color from Tab label color (Pill selected = OnInverse)
 * so badge copy stays OnNeutral on SurfaceHigh in every interactive state.
 */
export const TabBadgeSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.component.tabs.badgeSlot.background};
  color: ${({ theme }) => theme.component.tabs.badgeSlot.foreground};
  padding: ${({ theme }) =>
    `${theme.component.tabs.badgeSlot.paddingY} ${theme.component.tabs.badgeSlot.paddingX}`};
  border-radius: ${({ theme }) => theme.component.tabs.badgeSlot.radius};

  &,
  & * {
    color: ${({ theme }) => theme.component.tabs.badgeSlot.foreground};
  }
`;

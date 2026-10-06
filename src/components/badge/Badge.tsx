import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import styled, { css } from "styled-components";
import { forcedColorsChrome } from "../../utils/a11y";

export type BadgeVariant = "Neutral" | "Positive" | "Negative";

export type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  /**
   * Optional accessible name when visible text alone is not enough
   * (e.g. color conveys meaning).
   */
  accessibilityLabel?: string;
  /**
   * When true: `role="status"` + `aria-live="polite"`.
   * Default false so static badges (e.g. inside Tab) stay quiet.
   */
  live?: boolean;
} & Omit<HTMLAttributes<HTMLSpanElement>, "children" | "color" | "role">;

type StyledBadgeProps = {
  $variant: BadgeVariant;
};

const variantStyles = css<StyledBadgeProps>`
  ${({ theme, $variant }) => {
    const variant = theme.component.badge.variant[$variant];
    return css`
      color: ${variant.foreground};
      background-color: ${variant.background};
    `;
  }}
`;

const StyledBadge = styled.span<StyledBadgeProps>`
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  border: 0;
  font-style: normal;
  font-family: ${({ theme }) => theme.component.badge.typography.fontFamily};
  font-size: ${({ theme }) => theme.component.badge.typography.fontSize};
  line-height: ${({ theme }) => theme.component.badge.typography.lineHeight};
  font-weight: ${({ theme }) => theme.component.badge.fontWeight};
  white-space: nowrap;

  height: ${({ theme }) => theme.component.badge.desktop.height};
  padding: ${({ theme }) =>
    `${theme.component.badge.desktop.paddingY} ${theme.component.badge.desktop.paddingX}`};
  border-radius: ${({ theme }) => theme.component.badge.desktop.radius};

  ${variantStyles}
  ${forcedColorsChrome}

  @media (max-width: 768px) {
    height: ${({ theme }) => theme.component.badge.mobile.height};
    padding: ${({ theme }) =>
      `${theme.component.badge.mobile.paddingY} ${theme.component.badge.mobile.paddingX}`};
    border-radius: ${({ theme }) => theme.component.badge.mobile.radius};
  }
`;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    children,
    variant = "Neutral",
    accessibilityLabel,
    live = false,
    ...rest
  },
  ref,
) {
  return (
    <StyledBadge
      ref={ref}
      $variant={variant}
      data-variant={variant}
      {...rest}
      {...(accessibilityLabel != null
        ? { "aria-label": accessibilityLabel }
        : {})}
      {...(live
        ? { role: "status" as const, "aria-live": "polite" as const }
        : {})}
    >
      {children}
    </StyledBadge>
  );
});

Badge.displayName = "Badge";

export default Badge;

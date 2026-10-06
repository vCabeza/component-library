import {
  forwardRef,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import styled, { css } from "styled-components";
import { focusVisibleRing, forcedColorsInteractive } from "../../utils/a11y";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

type StyledButtonProps = {
  $variant: ButtonVariant;
  $size: ButtonSize;
};

const sizeStyles = css<StyledButtonProps>`
  ${({ theme, $size }) => {
    const size = theme.component.button.size[$size];
    return css`
      font-size: ${size.typography.fontSize};
      line-height: ${size.typography.lineHeight};
      font-family: ${size.typography.fontFamily};
      padding: ${size.paddingY} ${size.paddingX};
    `;
  }}
`;

const variantStyles = css<StyledButtonProps>`
  ${({ theme, $variant }) => {
    const variant = theme.component.button.variant[$variant];
    return css`
      color: ${variant.foreground};
      background-color: ${variant.background};
      border-color: ${variant.border};

      &:hover:not(:disabled) {
        background-color: ${variant.backgroundHover};
      }

      &:active:not(:disabled) {
        background-color: ${variant.backgroundActive};
      }
    `;
  }}
`;

const StyledButton = styled.button<StyledButtonProps>`
  border-style: solid;
  border-width: 0;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.component.button.radius};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.component.button.gap};
  text-decoration: none;

  ${sizeStyles}
  ${variantStyles}
  ${({ theme }) =>
    focusVisibleRing(theme, {
      width: theme.component.button.focusRingWidth,
      offset: theme.component.button.focusRingOffset,
      color: theme.component.button.focusRingColor,
    })}
  ${forcedColorsInteractive}

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.component.button.disabled.foreground};
    background-color: ${({ theme }) =>
      theme.component.button.disabled.background};
    border-color: ${({ theme }) => theme.component.button.disabled.border};
  }
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "medium",
      disabled = false,
      children,
      type = "button",
      onClick,
      ...rest
    },
    ref,
  ) {
    return (
      <StyledButton
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        $variant={variant}
        $size={size}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  },
);

export default Button;

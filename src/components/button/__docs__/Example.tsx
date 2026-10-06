import type { FC } from "react";
import Button, { type ButtonProps } from "../Button";

const Example: FC<ButtonProps> = ({
  disabled = false,
  onClick,
  variant = "primary",
  size = "medium",
  children = "Button",
  ...rest
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: "16px",
      }}
    >
      <Button
        size={size}
        disabled={disabled}
        onClick={onClick}
        variant={variant}
        {...rest}
      >
        {children}
      </Button>
    </div>
  );
};

export default Example;

import type { FC } from "react";
import Badge, { type BadgeProps } from "../Badge";

const Example: FC<BadgeProps> = ({
  children = "Badge",
  variant = "Neutral",
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
      <Badge variant={variant} {...rest}>
        {children}
      </Badge>
    </div>
  );
};

export default Example;

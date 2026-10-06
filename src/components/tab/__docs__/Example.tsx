import type { FC } from "react";
import Tab from "../Tab";
import type { TabProps } from "../Tab.types";

const Example: FC<TabProps> = ({
  id = "tab-1",
  children = "Tab label",
  variant = "Pill",
  isSelected = false,
  badge,
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
        padding: "24px",
      }}
    >
      <Tab
        id={id}
        variant={variant}
        isSelected={isSelected}
        badge={badge}
        {...rest}
      >
        {children}
      </Tab>
    </div>
  );
};

export default Example;

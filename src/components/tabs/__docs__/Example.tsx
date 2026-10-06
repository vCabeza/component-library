import { useState, type FC } from "react";
import { Tabs, TabList, TabPanel } from "../Tabs";
import { Tab } from "../../tab";
import type { TabsVariant } from "../Tabs.types";

export type TabsExampleProps = {
  variant?: TabsVariant;
  defaultSelectedKey?: string;
  controlled?: boolean;
};

const TabsExample: FC<TabsExampleProps> = ({
  variant = "Pill",
  defaultSelectedKey = "overview",
  controlled = false,
}) => {
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);

  const tabsProps = controlled
    ? {
        selectedKey,
        onSelectionChange: setSelectedKey,
      }
    : {
        defaultSelectedKey,
      };

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <Tabs variant={variant} aria-label="Product sections" {...tabsProps}>
        <TabList>
          <Tab id="overview">Overview</Tab>
          <Tab id="details" badge="New">
            Details
          </Tab>
          <Tab id="activity">Activity</Tab>
        </TabList>
        <TabPanel id="overview">Overview panel content.</TabPanel>
        <TabPanel id="details">Details panel content.</TabPanel>
        <TabPanel id="activity">Activity panel content.</TabPanel>
      </Tabs>
      <p style={{ marginTop: 16, fontSize: 13, opacity: 0.7 }}>
        Keyboard: Tab moves between tabs · Enter/Space selects · ← → switches
      </p>
    </div>
  );
};

export default TabsExample;

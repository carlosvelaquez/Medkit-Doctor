import React from "react";
import Icon, { IconifyIcon } from "@iconify/react";

import "./Styles/TabbedSection.scss";

type TabbedSectionProps = {
  title: string,
  color: string,
  icon: IconifyIcon,
  children: any
}

const TabbedSection = ({ title, color = "red", icon, children } : TabbedSectionProps) => {
  return (
    <div className="tabbed-section">
      <div
        className="title"
        style={{ background: `var(--${color}-gradient-background)` }}
      >
        <Icon icon={icon} />
        {title}
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default TabbedSection;

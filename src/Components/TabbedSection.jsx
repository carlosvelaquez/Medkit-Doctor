import React from "react";
import Icon from "@iconify/react";

import "./Styles/TabbedSection.scss";

const TabbedSection = ({ title, color = "red", icon, children }) => {
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

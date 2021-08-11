import React from "react";
import Icon from "@iconify/react";
import DivButton from "./DivButton";

import "./Styles/JumboButton.scss";

const JumboButton = ({
  action,
  text,
  icon,
  variant = "red",
  hidden = false,
}) => {
  const color1 = `var(--${variant}-gradient-start-color)`;
  const color2 = `var(--${variant}-gradient-finish-color)`;

  return (
    <DivButton
      className={`jumbo-button ${hidden ? "hidden" : ""}`}
      action={action}
      //   style={{ background: `var(--${variant}-gradient-background)` }}
    >
      <div
        className="background"
        style={{
          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color1} 100%)`,
        }}
      />
      <Icon icon={icon} />
      <div className="text">{text}</div>
    </DivButton>
  );
};

export default JumboButton;

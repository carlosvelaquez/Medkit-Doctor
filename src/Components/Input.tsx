import React, { useState } from "react";

import { Icon, IconifyIcon } from "@iconify/react";

import "./Styles/Input.scss";

export const Input = (props: {
  icon: IconifyIcon,
  error: boolean,
  action: () => void
}) => {
  const { icon, error, action } = props;

  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`icon-input
      ${focused ? " focused" : ""}${error ? " error" : ""}`}
    >
      {icon ? <Icon className="icon" icon={icon} /> : <></>}
      <input
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && action) {
            action();
          }
        }}
      />
    </div>
  );
};

export default Input;
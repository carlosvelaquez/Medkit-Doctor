import React, { useState } from "react";

import { Icon, IconifyIcon } from "@iconify/react";

import "./Styles/Input.scss";

type InputProps = {
  icon: object,
  error: boolean,
  placeholder: string,
  type: string,
  onChange: (React.ChangeEventHandler<HTMLInputElement>)
  action: () => void
}

export const Input = ({ icon, error, placeholder, type, onChange, action } : InputProps ) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`icon-input
      ${focused ? " focused" : ""}${error ? " error" : ""}`}
    >
      {icon ? <Icon className="icon" icon={icon} /> : <></>}
      <input
      placeholder={placeholder}
      type={type}
      onChange={onChange}
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

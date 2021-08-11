import React from "react";

export const DivButton = (props) => {
  const { stopPropagation, action } = props;

  const act = (e) => {
    if (stopPropagation) e.stopPropagation();
    if (action) action();
  };

  return (
    <div
      style={{ userSelect: "none" }}
      role="button"
      tabIndex={0}
      onClick={act}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          act();
        }
      }}
      {...props}
    />
  );
};

export default DivButton;

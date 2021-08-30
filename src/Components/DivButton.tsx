import React from "react";

type DivButtonProps = {
  id?: string;
  className?: string;
  style?: object;
  action?: () => void;
  allowPropagation?: boolean;
  children?: any;
};

export const DivButton = ({
  id,
  className,
  style,
  allowPropagation = false,
  action,
  children,
}: DivButtonProps) => {
  const act = () => {
    if (action) action();
  };

  return (
    <div
      id={id}
      className={className}
      style={{ ...style, userSelect: "none", cursor: "pointer" }}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        if (!allowPropagation) e.stopPropagation();
        act();
      }}
      onKeyPress={(e) => {
        if (!allowPropagation) e.stopPropagation();

        if (e.key === "Enter") {
          act();
        }
      }}
    >
      {children}
    </div>
  );
};

export default DivButton;

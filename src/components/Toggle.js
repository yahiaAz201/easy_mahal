import "./Toggle.css";
import React from "react";

export default function Toggle({
  pressed,
  onPressedChange,
  children,
  ...rest
}) {
  return (
    <button
      className={`btn-toggle ${pressed ? "active" : ""}`}
      onClick={() => {
        onPressedChange(!pressed);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

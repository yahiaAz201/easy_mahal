import "./AppInputTextFeild.css";

import React from "react";

import ErrorMessage from "./ErrorMessage";

export default function AppInputTextField({
  label,
  width,
  status,
  touched,
  error,
  rightIcon,
  ...rest
}) {
  const calc_status = status ? status : "primary";

  return (
    <div>
      <div className="text_input_container" style={{ width: width }}>
        <label
          className={`label label-status-${calc_status} ${
            touched && error ? "label-error" : ""
          }`}
        >
          {label}
        </label>
        <div
          className={`input input-status-${calc_status} ${
            touched && error ? "input-error" : ""
          }`}
        >
          <input {...rest} />
          {rightIcon}
        </div>
      </div>
      <ErrorMessage error={touched && error} />
    </div>
  );
}

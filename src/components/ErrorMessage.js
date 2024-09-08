import "./ErrorMessage.css";

import React from "react";

export default function ErrorMessage({ error, ...rest }) {
  if (!error) return null;
  return (
    <p className="error_message" {...rest}>
      {error}
    </p>
  );
}

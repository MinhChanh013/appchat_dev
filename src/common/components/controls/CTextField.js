import React from "react";
import TextField from "@mui/material/TextField";

import "../../assets/styles/controls/CTextField.scss";

const CTextField = ({
  name,
  registerName,
  className,
  label,
  variant = "outlined",
  type = "text",
}) => {
  return (
    <span className={`textField ${className}`}>
      <TextField
        {...registerName}
        label={label}
        variant={variant}
        type={type}
        defaultValue={name ? name : ""}
      />
    </span>
  );
};

export default CTextField;

import React from "react";
import TextField from "@mui/material/TextField";

import "../../assets/styles/controls/CTextField.scss";

const CTextField = ({ label, variant = "outlined", type = "text" }) => {
  return (
    <span className="textField">
      <TextField label={label} variant={variant} type={type} />
    </span>
  );
};

export default CTextField;

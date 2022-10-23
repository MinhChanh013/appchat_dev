import React from "react";
import Button from "@mui/material/Button";

import "../../assets/styles/controls/CButton.scss";

const CButton = ({
  disabled = false,
  type,
  icon,
  children,
  variant = "contained",
  onClick,
  id
}) => {
  return (
    <span className="cbutton-mui">
      <Button
        disabled={disabled}
        type={type}
        onClick={onClick}
        variant={variant}
        id={id}
      >
        {icon ? icon : ""} {children}
      </Button>
    </span>
  );
};

export default CButton;

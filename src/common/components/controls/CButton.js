import React from "react";
import Button from "@mui/material/Button";

import "../../assets/styles/controls/CButton.scss";

const CButton = ({ type, icon, children, variant = "contained", onClick }) => {
  return (
    <span className="cbutton-mui">
      <Button type={type} onClick={onClick} variant={variant}>
        {icon ? icon : ""} {children}
      </Button>
    </span>
  );
};

export default CButton;

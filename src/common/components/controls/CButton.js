import React from "react";
import Button from "@mui/material/Button";

import "../../assets/styles/controls/CButton.scss";

const CButton = ({ children, variant = "contained", onClick }) => {
  return (
    <span className="cbutton-mui">
      <Button onClick={onClick} variant={variant}>
        {children}
      </Button>
    </span>
  );
};

export default CButton;

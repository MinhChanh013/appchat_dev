import React from "react";
import Button from "@mui/material/Button";

const CButton = ({ children, variant = "contained", onClick }) => {
  return (
    <Button onClick={onClick} variant={variant}>
      {children}
    </Button>
  );
};

export default CButton;

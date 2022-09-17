import React from "react";
import Button from "@mui/material/Button";

const CButton = ({ children, variant = "contained" }) => {
  return <Button variant={variant}>{children}</Button>;
};

export default CButton;

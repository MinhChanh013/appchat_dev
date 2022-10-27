import React from "react";
import IconButton from "@mui/material/IconButton";
const CIconButton = ({  icon, className, onclick, component }) => {
  return (
    <IconButton
      className={className}
      onClick={onclick}
      component={component}
    >
      {icon}
    </IconButton>
  );
};

export default CIconButton;

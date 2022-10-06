import React from "react";
import IconButton from "@mui/material/IconButton";
const CIconButton = ({ icon, className, onclick }) => {
  return (
    <IconButton className={className} onClick={onclick}>
      {icon}
    </IconButton>
  );
};

export default CIconButton;

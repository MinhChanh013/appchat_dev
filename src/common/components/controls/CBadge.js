import React from "react";
import Badge from "@mui/material/Badge";
const CBadge = ({ number }) => {
  return (
    <Badge color="error" badgeContent={number}>
      <span></span>
    </Badge>
  );
};

export default CBadge;

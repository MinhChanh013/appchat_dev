import React from "react";

import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

import "../../assets/styles/controls/CTooltip.scss"
const CTooltip = ({ children, title, placement }) => {
  return (
    <Grid item className="tooltip">
      <Tooltip title={title} placement={placement}>
        {children}
      </Tooltip>
    </Grid>
  );
};

export default CTooltip;

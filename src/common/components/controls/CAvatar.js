import React from "react";
// components
import Avatar from "@mui/material/Avatar";
import "../../assets/styles/controls/CAvatar.scss";
const CAvatar = ({ image, border }) => {
  return (
    <div className={`avatar ${border ? "border" : ""}`}>
      <div className="avatar_container">
        <Avatar alt="" sx={{ width: 45, height: 45 }} src={image} />
      </div>
    </div>
  );
};

export default CAvatar;

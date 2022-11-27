import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { getProfile } from "@/apis/auth.api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { offlineUser } from "@/apis/auth.api";
// components
import MeProfile from "../layout/Profile/MeProfile/MeProfile";

import "../../assets/styles/controls/CMenu.scss";
const CMenu = ({ CAvatar, socket }) => {
  const changeNavigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeModal, setActiveModal] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setActiveModal(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isLoading, data, refetch } = useQuery(
    ["getProfile"],
    () => getProfile(),
    { enabled: false }
  );

  const handelGetProfile = () => {
    setActiveModal(true);
    refetch();
  };

  return (
    <div>
      <React.Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {CAvatar}
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          className="menu__main"
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              ml: 7,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem>
            <div
              className="item-profile"
              onClick={() => {
                handelGetProfile();
              }}
            >
              <Avatar /> My account
            </div>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem>
            <div
              onClick={() => {
                offlineUser();
                socket.disconnect();
                document.cookie = `token_api=; Path=/; Expires=${Date()};`;
                changeNavigate("/", { state: { alert: "Logout success" } });
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </div>
          </MenuItem>
        </Menu>
      </React.Fragment>
      {!isLoading && activeModal && (
        <MeProfile
          socket={socket}
          activeModal={activeModal}
          me
          data={data.data}
        />
      )}
    </div>
  );
};

export default CMenu;

import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CAvatar from "./CAvatar";
import CButton from "./CButton";
import CTextField from "./CTextField";

import { AiOutlineEdit } from "react-icons/ai";

import "../../assets/styles/controls/CModalRename.scss";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const CModalRename = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-rename">
          <div className="modal-rename__header">
            <AiOutlineEdit />
            <span>Set alias</span>
          </div>
          <div className="modal-rename__main">
            <CAvatar image="" />
            <p>
              Choose a memorable name for Duxica Team. <br />
              Notice: This alias will only be shown to you
            </p>
            <CTextField className="form_chat" label="Enter name..."/>
          </div>
          <div className="modal-rename__footer">
            <CButton> Save</CButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CModalRename;

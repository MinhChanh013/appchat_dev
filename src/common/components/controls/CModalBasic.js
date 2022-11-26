import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const CModalBasic = ({
  openFirst = false,
  child,
  modal,
  width = 400,
  padding = 4,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { width },
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
    borderRadius: 3,
    overflow: "hidden",
    p: padding,
  };

  const [open, setOpen] = React.useState(openFirst);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={{ display: "flex" }} onClick={handleOpen}>
        {child}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{modal}</Box>
      </Modal>
    </div>
  );
};

export default CModalBasic;

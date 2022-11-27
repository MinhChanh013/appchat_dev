import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CAvatar from "./CAvatar";
import CButton from "./CButton";
import CTextField from "./CTextField";

// api
import { renameChatGroup, requestRenameFriend } from "@/apis/chat.api";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { AiOutlineEdit } from "react-icons/ai";

import "../../assets/styles/controls/CModalRename.scss";
import { useState } from "react";
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

const CModalRename = ({
  myUser,
  phone_friend,
  isFriend,
  avatarFriend,
  socket,
  dataRoom,
  children,
  name,
}) => {
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);
  const [rename, setRename] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const muatationRename = useMutation((value) => {
    setRename(true);
    const temp = {
      room_id: dataRoom._id,
      name_room: value.name_room,
    };

    return renameChatGroup(temp);
  });

  const muatationRenameFriend = useMutation((value) => {
    const temp = {
      _id: dataRoom._id,
      nick_name: value.name_room,
      phone_friend: phone_friend,
    };

    // socket.emit("rename_Friend", {
    //   my_Phone: myUser && myUser.phone,

    // });
    handleClose();
    return requestRenameFriend(temp);
  });

  if (!muatationRename.isLoading && !muatationRename.isError && rename) {
    socket.emit("rename_Room", {
      data: {
        list_member: dataRoom.list_member,
        data: muatationRename.data.data,
      },
    });
    handleClose();
    setRename(false);
  }
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
          <form
            onSubmit={
              isFriend
                ? handleSubmit(muatationRenameFriend.mutate)
                : handleSubmit(muatationRename.mutate)
            }
          >
            <div className="modal-rename__main">
              <CAvatar image={avatarFriend} />
              <p>
                Choose a memorable name for {name}. <br />
                Notice: This alias will only be shown to you
              </p>
              <CTextField
                registerName={{
                  ...register("name_room", { required: true }),
                }}
                name={name}
                className="form_chat"
                label="Enter name..."
              />
            </div>
            <div className="modal-rename__footer">
              <CButton type="submit">Save</CButton>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CModalRename;

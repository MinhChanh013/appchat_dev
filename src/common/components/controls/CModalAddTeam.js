import React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// components
import CAvatar from "./CAvatar";
import CTextField from "./CTextField";
import CIconButton from "./CIconButton";
import { toast } from "react-toastify";

// icon && image
import person1 from "../../assets/images/person1.png";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsCamera } from "react-icons/bs";

// api
import { getAllFriend } from "@/apis/friend.api";
import { findPhoneNotMe } from "@/apis/user.api";
import { createChatGroup, requestAddMember } from "@/apis/chat.api";
import { useQuery, useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import "../../assets/styles/controls/CModalAddTeam.scss";

import CButton from "./CButton";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: 3,
  overflow: "hidden",
  width: "auto",
  padding: 3,
};

const CModalAddTeam = ({ id_room, type, child, refetch, socket }) => {
  const [open, setOpen] = React.useState(false);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const { register, handleSubmit } = useForm();
  const [createGroup, setCreateGroup] = React.useState(false);
  // api
  const { isLoading, isError, error, data } = useQuery(
    ["getFriendTeam"],
    () => {
      setActiveModal(true);
      return getAllFriend();
    }
  );

  const mutationFindPhone = useMutation((phone) => {
    return findPhoneNotMe(phone);
  });

  const mutationCreateGroup = useMutation((value) => {
    let list_member = [];
    right.forEach((course) => {
      list_member.push({ phone: course.phone, name: course.name });
    });
    if (type === "add_member") {
      requestAddMember({ room_id: id_room, list_member: list_member }).then(
        (course) => {
          socket.emit("add_member", {
            room_id: id_room,
            list_memberNew: list_member,
            data: course.data,
          });
          handleClose();
        }
      );
    } else {
      setCreateGroup(true);
      return createChatGroup({
        name_room: value.name_room,
        list_member: list_member,
      });
    }
  });

  if (
    !mutationCreateGroup.isLoading &&
    !mutationCreateGroup.isError &&
    createGroup
  ) {
    refetch();
    setCreateGroup(false);
    toast.success("Create group chat success!");
    setOpen(false);

    socket.emit("create_ChatGroup", {
      data: {
        data: mutationCreateGroup.data.data,
        id_room: mutationCreateGroup.data.data.list_member,
      },
    });
  }

  if (
    !mutationCreateGroup.isLoading &&
    mutationCreateGroup.isError &&
    createGroup
  ) {
    setCreateGroup(false);
    toast.error(mutationCreateGroup.error.response.data);
  }

  !isLoading && isError && toast.error(error.message);
  const [checked, setChecked] = React.useState([]);
  const [activeModal, setActiveModal] = React.useState(false);
  const [activeSearch, setActiveSearch] = React.useState(false);
  const [activeMaintain, setActiveMaintain] = React.useState(true);

  if (!isLoading && !isError && activeModal && activeMaintain) {
    data.data.list_friend ? setLeft(data.data.list_friend) : setLeft([]);
    setActiveModal(false);
    setActiveMaintain(false);
  }

  if (
    !mutationFindPhone.isLoading &&
    !mutationFindPhone.isError &&
    mutationFindPhone.data &&
    activeSearch
  ) {
    if (mutationFindPhone.data.data) {
      let i = 0;
      right.forEach((course) => {
        if (course.phone === mutationFindPhone.data.data.phone) {
          i++;
        }
      });
      if (i === 0) {
        setLeft([
          {
            name: `${mutationFindPhone.data.data.first_name.trim()} ${mutationFindPhone.data.data.last_name.trim()}`,
            phone: mutationFindPhone.data.data.phone,
          },
        ]);
      }
    } else {
      setLeft([]);
    }
    setActiveSearch(false);
  }

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  function union(a, b) {
    return [...a, ...not(b, a)];
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card
      sx={{
        boxShadow: "unset",
        padding: "10px 0",
        border: "1.5px solid rgb(231, 228, 228)",
      }}
    >
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 300,
          maxHeight: 300,
          minHeight: 300,
          overflow: "auto",
        }}
        className="list__friend-modalAdd"
        dense
        component="div"
        role="list"
      >
        {!isLoading &&
          data.data.list_friend &&
          items.map((value, index) => {
            const labelId = `transfer-list-all-item-${value}-label`;
            return (
              <ListItem
                key={index}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemAvatar>
                  <CAvatar image={person1} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={!isLoading && value.name} />
              </ListItem>
            );
          })}
        <ListItem />
      </List>
    </Card>
  );
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
        <Box sx={style}>
          <div className="modal-addTeam">
            {!isLoading && !isError && (
              <form onSubmit={handleSubmit(mutationCreateGroup.mutate)}>
                <div className="modal-addTeam__header">
                  <AiOutlineUsergroupAdd />
                  {type === "add_member" ? (
                    <span>Add Member</span>
                  ) : (
                    <span>Create team</span>
                  )}
                </div>
                {type === "add_member" ? (
                  ""
                ) : (
                  <div className="modal-addTeam__information">
                    <CIconButton
                      component="label"
                      className="modal-addTeam__iconImgae"
                      icon={
                        <>
                          <input hidden accept="image/*" type="file" />
                          <BsCamera />
                        </>
                      }
                    ></CIconButton>
                    <CTextField
                      registerName={{
                        ...register("name_room", { required: true }),
                      }}
                      label="Enter name team ..."
                      className="form_chat"
                    />
                  </div>
                )}

                <div className="modal-addTeam__search">
                  <span>Add friend to group</span>
                  <input
                    onChange={(e) => {
                      if (e.target.value === "") {
                        let newLeft = [];
                        if (right.length === 0 && !isLoading && data.data) {
                          setLeft(data.data.list_friend);
                        } else {
                          !isLoading &&
                            data.data &&
                            data.data.list_friend.forEach((course) => {
                              let dem = 0;
                              right.forEach((courseLeft, index) => {
                                if (course === courseLeft) {
                                  dem++;
                                }
                                dem === 0 &&
                                  index === right.length - 1 &&
                                  newLeft.push(course);
                              });
                            });
                          setLeft(newLeft);
                        }
                        setActiveSearch(false);
                      } else {
                        mutationFindPhone.mutate(e.target.value);
                        setActiveSearch(true);
                      }
                    }}
                    placeholder="Enter name, phone number friend ..."
                    className="form_chat-find"
                  />
                </div>
                <div className="modal-addTeam__listFriend">
                  <h4>List Friend & Recent results</h4>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item>{customList("Choices", left)}</Grid>
                    <Grid item>
                      <Grid container direction="column" alignItems="center">
                        <Button
                          sx={{ my: 0.5 }}
                          variant="outlined"
                          size="small"
                          onClick={handleCheckedRight}
                          disabled={leftChecked.length === 0}
                          aria-label="move selected right"
                        >
                          &gt;
                        </Button>
                        <Button
                          sx={{ my: 0.5 }}
                          variant="outlined"
                          size="small"
                          onClick={handleCheckedLeft}
                          disabled={rightChecked.length === 0}
                          aria-label="move selected left"
                        >
                          &lt;
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item>{customList("Chosen", right)}</Grid>
                  </Grid>
                </div>
                <div className="btn-modal_createTeam">
                  {type === "add_member" ? (
                    right.length >= 1 ? (
                      <CButton type="submit">Add Member</CButton>
                    ) : (
                      <CButton disabled>Add Member</CButton>
                    )
                  ) : right.length >= 2 ? (
                    <CButton type="submit">Create Team</CButton>
                  ) : (
                    <CButton disabled>Create Team</CButton>
                  )}
                </div>
              </form>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CModalAddTeam;

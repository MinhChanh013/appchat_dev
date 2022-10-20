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

// components
import CAvatar from "./CAvatar";
import CTextField from "./CTextField";
import CIconButton from "./CIconButton";
// icon && image

import person1 from "../../assets/images/person1.png";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsCamera } from "react-icons/bs";

import "../../assets/styles/controls/CModalAddTeam.scss"

import CModalBasic from "./CModalBasic";
const CModalAddTeam = ({ child }) => {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [right, setRight] = React.useState([]);

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
    <Card  sx={{
      boxShadow: "unset",
      padding: "10px 0",
      border: "1.5px solid rgb(231, 228, 228)"
    }}>
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
          maxHeight: 400,
          minHeight: 400,
          bgcolor: "#fff",
          overflow: "auto",
        }}
        className= "list__friend-modalAdd"
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
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
              <ListItemText id={labelId} primary="Arman" />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
  return (
    <CModalBasic
      child={child}
      width="auto"
      modal={
        <div className="modal-addTeam">
          <div className="modal-addTeam__header">
            <AiOutlineUsergroupAdd />
            <span>Create team</span>
          </div>
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
            <CTextField label="Enter name team ..." className="form_chat" />
          </div>
          <div className="modal-addTeam__search">
            <span>Add friend to group</span>
            <CTextField
              label="Enter name, phone number friend ..."
              className="form_chat"
            />
          </div>
          <div className="modal-addTeam__listFriend">
            <h4>Recent</h4>
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
        </div>
      }
    />
  );
};

export default CModalAddTeam;

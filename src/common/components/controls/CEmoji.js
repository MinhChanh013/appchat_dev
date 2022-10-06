import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

import EmojiPicker, {
  EmojiStyle,
  Theme,
  EmojiClickData,
  Emoji,
} from "emoji-picker-react";

import "../../assets/styles/controls/CEmoji.scss";
const CEmoji = ({ Emoji, className }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={className}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SentimentSatisfiedAltIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <EmojiPicker
          // onEmojiClick={onClick}
          lazyLoad={true}
          theme={Theme.LIGHT}
        />
      </Menu>
    </div>
  );
};

export default CEmoji;

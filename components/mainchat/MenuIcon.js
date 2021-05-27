import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import { db } from "../../config/firebase";
export default function MenuIcon({ chatId }) {
  console.log(chatId);
  const options = ["Clear Chat", "Delete Chat"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const clearChat = () => {
    db.collection("chats")?.doc(chatId)?.collection("messages")?.delete();
    handleClose();
  };
  const deleteChat = () => {
    db.collection("chats").doc(chatId).delete();
    handleClose();
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <CustomMenu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 45 * 4.5,
            width: "9rem",
          },
        }}
      >
        <MenuItem key={options[0]} onClick={clearChat}>
          {options[0]} <Clear />
        </MenuItem>
        <MenuItem key={options[1]} onClick={deleteChat}>
          {options[1]} <DelIcon />
        </MenuItem>
      </CustomMenu>
    </div>
  );
}
const Clear = styled(ClearIcon)`
  color: gray;
  padding-left: 5px;
`;
const DelIcon = styled(DeleteIcon)`
  color: red;
  padding-left: 5px;
`;
const CustomMenu = styled(Menu)`
  &&& {
    margin-top: 40px;
  }
`;
const CustomMenuItem = styled(MenuItem)``;

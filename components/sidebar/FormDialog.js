import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";
import * as EmailValidator from "email-validator";

// import { useAuthState } from "react-firebase-hooks/auth";

export default function FormDialog({ input, setInput, onAdd }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const checkInput = () => {
    if (!input) return null;
    if (EmailValidator.validate(input)) {
      onAdd();
      setOpen(false);
    }
    return null;
  };
  return (
    <div>
      <SidebarButton onClick={handleClickOpen}>Start a New Chat</SidebarButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">WhatsApp</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter an email address for user you wish to chat with
          </DialogContentText>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={checkInput} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

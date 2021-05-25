import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { Chat, MoreVert, Search } from "@material-ui/icons";
import styled from "styled-components";
import { auth, db } from "../../config/firebase";
import FormDialog from "./FormDialog";

const Sidebar = () => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const createChat = () => {
    console.log("in create chat");
    console.log(input);
    // here we will add firebase
    db.collection("chats").add({
      users: [user.email, input],
    });
    setInput("");
  };
  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} />
        <IconContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconContainer>
      </Header>
      <SearchContainer>
        <Search />
        <SearchInput placeholder="Search in chats" />
      </SearchContainer>
      <FormDialog input={input} setInput={setInput} onAdd={createChat} />
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const IconContainer = styled.div``;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 2px;
  padding: 20px;
`;
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  padding-left: 5px;
  flex: 1;
`;

import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../../config/firebase";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, Mic, MoreVert } from "@material-ui/icons";
import Loading from "../../components/loading/Loading";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../Message";
import { useState } from "react";
import firebase from "firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

const ChatScreen = ({ chat, messages }) => {
  // console.log(chat);
  // console.log("=============================");
  // console.log(messages);
  const [input, setInput] = useState("");
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };
  const sendMessage = (e) => {
    e.preventDefault();
    //Update lastseen
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
  };
  const recipientsEmail = getRecipientEmail(chat.users, user);
  if (loading || !recipientsEmail) return <Loading />;
  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>{recipientsEmail}</h3>
          <p>last Seen ...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            {" "}
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <Mic />
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;
const InputContainer = styled.form`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: white;
  z-index: 100;
  padding: 10px;
`;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 1;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: gray;
    margin-top: 7px;
  }
`;
const HeaderIcons = styled.div``;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
const EndOfMessage = styled.div``;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 17px;
  margin-left: 15px;
  margin-right: 15px;
`;

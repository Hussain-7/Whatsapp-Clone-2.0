import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Sidebar from "../../components/sidebar/Sidebar";
import ChatScreen from "../../components/mainchat/ChatScreen";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";
import Loading from "../../components/loading/Loading";

function Chat({ chat, messages }) {
  console.log(chat);
  console.log(messages);
  const [user, loading] = useAuthState(auth);
  // console.log()
  if (loading) return <Loading />;
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);
  //Preping the messages on the server
  const messageRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();
  const messages = messageRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp?.toDate().getTime(),
    }));
  //Preping the Chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Sidebar from "../../components/sidebar/Sidebar";
import ChatScreen from "../../components/mainchat/ChatScreen";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  if (!user) {
    router.push("/");
  }
  return chat !== null ? (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat?.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  ) : (
    <Container>
      <Head>
        <title>WhatsApp 2.1</title>
      </Head>
      <Sidebar />
      <MainContainer></MainContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);
  //Preping the messages on the server
  if (context.query.id == "main") {
    console.log("main");
    return {
      props: {
        messages: null,
        chat: null,
      },
    };
  }
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
      timestamp: message?.timestamp?.toDate().getTime(),
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
      chat: JSON.stringify(chat),
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
const MainContainer = styled.div`
  flex: 1;
  height: 100vh;
  background-color: #e5ded8;
`;

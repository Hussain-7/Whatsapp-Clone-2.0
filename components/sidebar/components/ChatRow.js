import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../config/firebase";
import { useRouter } from "next/router";
import styled from "styled-components";
import getRecipientEmail from "../../../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
const ChatRow = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientsEmail = getRecipientEmail(users, user);
  return (
    <Container>
      {recipient ? <UserAvatar src={recipient?.photoURL} /> : <UserAvatar />}

      <p>{recipientsEmail}</p>
    </Container>
  );
};

export default ChatRow;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

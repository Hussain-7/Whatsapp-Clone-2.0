import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../config/firebase";
const Login = () => {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      })
      .catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src="WhatsApp.svg" />
        <Heading>Sign in to WhatsApp</Heading>
        <LoginButton onClick={signIn}>Sign in with Google</LoginButton>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Heading = styled.h2`
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  @media (max-width: 500px) {
    padding: 60px;
  }
`;

const Logo = styled.img`
  height: 150px;
  width: 180px;
  @media (max-width: 500px) {
    height: 80px;
    width: 100px;
  }
`;

const LoginButton = styled(Button)`
  &&& {
    margin-top: 15px;
    text-transform: inherit !important;
    background-color: #0b9149 !important;
    color: white;
    @media (max-width: 500px) {
      font-size: 10px;
    }
  }
`;

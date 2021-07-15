import Loading from "../components/loading/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function Home() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  if (user) {
    router.push("/chat/main");
  }
  return <Loading />;
}



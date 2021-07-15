import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import Loading from "../components/loading/Loading";
import Login from "./login";
import { useEffect } from "react";
import firebase from "firebase";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      console.log(user);
      db.collection("users").doc(user.uid).set(
        {
          name: user.displayName,
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) {
    console.log("Logout clicked");
    return <Login />;
  } else {
    if (router.query.logout) {
      router.query = {};
      return <Login />;
    } else {
      return <Component {...pageProps} />;
    }
  }
}

export default MyApp;
import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import Login from "./login";
import Loading from "../components/loading/Loading";
import { useEffect } from "react";
import firebase from "firebase";
function MyApp({ Component, pageProps }) {
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
    return <Login />;
  } else return <Component {...pageProps} />;
}

export default MyApp;

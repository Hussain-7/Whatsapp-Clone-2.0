import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAE5td6-Dd7jnkb7ZAaGOAlkHpPfSgHt2s",
  authDomain: "whatsapp-clone-v2-38db2.firebaseapp.com",
  projectId: "whatsapp-clone-v2-38db2",
  storageBucket: "whatsapp-clone-v2-38db2.appspot.com",
  messagingSenderId: "517726632830",
  appId: "1:517726632830:web:1b324efc303378aa9a912f"
};

// Not intitializing firebase apps if already exists
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

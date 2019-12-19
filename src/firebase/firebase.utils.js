import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyA5cFMfRj0MYKuYMjOVd8KOKBNB_o-cSfA",
  authDomain: "crwn-db-66998.firebaseapp.com",
  databaseURL: "https://crwn-db-66998.firebaseio.com",
  projectId: "crwn-db-66998",
  storageBucket: "crwn-db-66998.appspot.com",
  messagingSenderId: "317210629966",
  appId: "1:317210629966:web:a6192da12373d3f7ffb01f",
  measurementId: "G-BPEJHFL92X"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //Si no hay ningun usuario autentificado no hago nada
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user...", error.message);
    }
  }

  //si esta autentificado tengo que preguntar si esta registrado en la base de datos...
  return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
//Sign in with google...
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

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

//Insercion en la base de datos
/*
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  //Asegura que las inserciones en la base de datos sean completas
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const docRef = collectionRef.doc();
    batch.set(docRef, obj);
  });
  return await batch.commit();
};
*/

export const convertCollectionsSnapshotToMap= (collections)=>{
  console.log("Estoy llegando aqui con : ");
  console.log(collections); 
  
  const TransformedCollection = collections.docs.map(
    doc => {
      const {title,items} = doc.data();
      return {
        routeName : encodeURI(title.toLowerCase()),
        id : doc.id,
        title,
        items
      }
    }
  )

  return TransformedCollection.reduce((acumulator,collection)=>{
    acumulator[collection.title.toLowerCase()]=collection;
      return acumulator;
  },{});


}

firebase.initializeApp(config);
export const auth = firebase.auth();
//Sign in with google...
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export default firebase;

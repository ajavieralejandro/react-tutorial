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

  console.log("El snapShot que estoy recibiendo es : ",snapShot);

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

//Crea la coleccion cart en la base de datos de firebase llamando a writeUserData
export const addCart = async () =>{
  //Arreglo de usuarios
  let usersArray = [];
  const array2 = [];
  //De esta manera recorro los usuarios en la coleccioón 
  await firestore.collection('users')
  .get()
  .then(function(querySnapshot){
    usersArray = querySnapshot.docs;
  });

  writeUserData(usersArray);
  //console.log("el resultado del script es : ",aux);

}

async function writeUserData(objectsToAdd){
  const collectionRef = firestore.collection("carts");
  const batch = firestore.batch();


  objectsToAdd.forEach(obj =>{
    //console.log("Estoy queriendo insertar ",obj);
    const newDocRef = collectionRef.doc(obj.id);
    const toIns = {id:obj.id, cart:[]};
    batch.set(newDocRef,toIns);
  });
  await batch.commit().then(result => {
    console.log('Transaction success!');
  }).catch(err => {
    console.log('Transaction failure:', err);
  });
}

export const getUserCart = async (userId) =>{
  //addCart();
  let toR = null;
  console.log("Empiezo la operacion en firebase...");
  const userCart = await firestore.collection("carts").doc(userId);
  let getDoc =  await userCart.get()
  .then(response => toR =  response.data())
  .catch(error => console.log("Error : ",error));
  console.log("Termine la operacion dentro de firebase...");
  return toR;
}

export const writeUserCart = async(userId,cart) =>{
  firestore.collection("carts").doc(userId).set(cart)
  .then(response => console.log("El objeto fue correctamente agregado a la base de datos..."))
  .catch(error => console.log("No se pudo insertar el objeto en la base de datos : ",error));
}


export default firebase;

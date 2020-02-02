import {takeLatest, put, all, call} from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {signInSuccess,signInFailure, signOutFailure, signOutSuccess, signUpSuccess, signUpFailure} from "./user.actions";
import {auth, googleProvider, createUserProfileDocument,getCurrentUser} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth){
 
    try{
        yield console.log("voy a llamar al metodo con :",userAuth);
        const userRef = yield call(createUserProfileDocument,userAuth);
        yield console.log("Aparentemente todo salio como esperamos...");
        const userSnapshot = yield userRef.get();
        console.log("Ahora todo se desmadra");
        yield put(signInSuccess({id : userSnapshot.id,...userSnapshot.data}));
    }
    catch(error){
        yield put(signInFailure(error))
    }
  

}

export function* isUserAthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return; 
        yield getSnapshotFromUserAuth(userAuth);


    }
    catch(error){
        yield put(signInFailure(error))
    } 

}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAthenticated)

}

export function* signInWithGoogle(){
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
      } catch (error) {
        yield put(signInFailure(error));
      }

}

export function* signInWithEmail({payload : {email,password}}){
    try{
        const {user} = yield  auth.signInWithEmailAndPassword(email,password);
        console.log("I am an error");
        yield getSnapshotFromUserAuth(user);


    }
    catch(error){
        console.log("NO VEN QUE ESTOY ATAJANDO EL ERROR !!!");
        yield put(signInFailure(error))


    }
}

export function* signUp({payload :{ displayName, email, password, confirmPassword }}){
    try{
 
        const  {user}  = yield  auth.createUserWithEmailAndPassword(
                email,
                password
              );
            const userToIns =  yield createUserProfileDocument(user, { displayName });
            yield put(signInSuccess(userToIns));
        }

    
    catch(error){
        yield(put(signUpFailure(error)))

    }
}

export function* signOut(){
    console.log("Estoy viendo como estoy...");
    try{
        
        yield auth.signOut();
        console.log("por ahora voy bien");
        yield put(signOutSuccess());

    }
    catch(error){
        yield put(signOutFailure(error))
    }
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle)
}

export function* onEmailSignInStart(){
    try{
        yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail)
    }
    catch(error){console.log(error)}
}

export function* onSingUpStart(){
    console.log("me LLAMO");
    yield takeLatest(UserActionTypes.SIGNUP_START,signUp);
}


export function* userSagas() {
    
    yield all([
      call(onGoogleSignInStart),call(onCheckUserSession),call(onSignOutStart),call(onEmailSignInStart),call(onSingUpStart)
    ]);
  }
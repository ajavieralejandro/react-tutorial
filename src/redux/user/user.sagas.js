import {takeLatest, put, all, call} from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {signInSuccess,signInFailure, signOutFailure, signOutSuccess} from "./user.actions";
import {auth, googleProvider, createUserProfileDocument,getCurrentUser} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth){
    console.log("Me esta llegando : ",userAuth);

    try{
        const userRef = yield call(createUserProfileDocument,userAuth);
        const userSnapshot = yield userRef.get();
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
        const {user} =  auth.signInWithEmailAndPassword(email,password);
        yield getSnapshotFromUserAuth(user);


    }
    catch(error){
        yield put(signInFailure(error))


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
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail)
}

export function* userSagas() {
    yield all([
      call(onGoogleSignInStart),call(onCheckUserSession),call(onSignOutStart)
    ]);
  }
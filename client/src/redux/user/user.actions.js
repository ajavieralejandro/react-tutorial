import UserActionTypes from "./user.types";
import CartActionTypes from "../cart/cart.types";


export const googleSignInStart = () => (
  {type : UserActionTypes.GOOGLE_SIGN_IN_START}
)



export const emailSignInStart = (emailAndPassword) => ({
  type : UserActionTypes.EMAIL_SIGN_IN_START,
  payload : emailAndPassword
})



export const signInSuccess = (user) => {
  //console.log("todo marcha bien");
  const toR = {
  type : UserActionTypes.SIGN_IN_SUCCESS,
  payload : user,
  }
  //console.log("despacho : ",toR);
  return toR;
}

export const signInFailure = (error) => ({
  type : UserActionTypes.SIGN_IN_FAILURE,
  payload : error
})

export const signOutFailure = (error) =>({
  type : UserActionTypes.SIGN_OUT_FAILURE,
  payload : error
})

export const signOutSuccess = (error) =>({
  type : UserActionTypes.SIGN_OUT_SUCCESS,
  payload : error
})

export const checkUserSession = () => ({
  type : UserActionTypes.CHECK_USER_SESSION
})

export const signOutStart = () =>({
  type : UserActionTypes.SIGN_OUT_START
})

export const signUpStart = (user) =>({
  type : UserActionTypes.SIGNUP_START,
  payload : user
})

export const signUpFailure = (error) => ({
  type : UserActionTypes.SIGN_UP_FAILURE,
  payload : error
})

export const signUpSuccess = (user)=>({
  type : UserActionTypes.SIGN_IN_SUCCESS,
  payload : user
})

export const saveCart = (userId) =>({
  type : CartActionTypes.SAVE_CART_ITEMS,
  payload : userId
})





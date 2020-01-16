import UserActionTypes from "./user.types";


export const googleSignInStart = () => (
  {type : UserActionTypes.GOOGLE_SIGN_IN_START}
)



export const emailSignInStart = (emailAndPassword) => ({
  type : UserActionTypes.EMAIL_SIGN_IN_START,
  payload : emailAndPassword
})

export const signInSuccess = (user) => {
  console.log("todo marcha bien");
  const toR = {
  type : UserActionTypes.SIGN_IN_SUCCESS,
  payload : user,
  }
  console.log("despacho : ",toR);
  return toR;
}

export const signInFailure = (error) => ({
  type : UserActionTypes.SIGN_IN_FAILURE,
  payload : error
})




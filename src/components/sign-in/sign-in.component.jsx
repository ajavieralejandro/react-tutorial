import React,{useState} from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {googleSignInStart,emailSignInStart} from "../../redux/user/user.actions";
import { connect } from "react-redux";
import "./sign-in.styles.scss";

const SignIn = ({googleSignInStart,emailSignInStart}) => {

  const [userCredentials, setUserCredentials] = useState({email:'',password:''});
  const {email,password} = userCredentials;

  const handleChange = event => {
    //extraigo el valor y el nombr
    const { value, name } = event.target;
    setUserCredentials({...userCredentials, [name]: value });
    
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = userCredentials;
    emailSignInStart(email,password);
    
  };

  


    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
          <FormInput
            handleChange={handleChange}
            name="email"
            label="email"
            type="email"
            value={email}
            required
          />

          <FormInput
            handleChange={handleChange}
            label="password"
            name="password"
            type="password"
            value={password}
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
              Sign In with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }


const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart : (email,password) => dispatch(emailSignInStart({email,password}))
  

})

export default connect(null,mapDispatchToProps)(SignIn);

import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {googleSignInStart,emailSignInStart,proob} from "../../redux/user/user.actions";
import { connect } from "react-redux";
import "./sign-in.styles.scss";

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    //extraigo el valor y el nombr
    const { value, name } = event.target;
    this.setState({ [name]: value });
    
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const {emailSignInStart} = this.props;
    emailSignInStart(email,password);
    /*try {
      await auth.signInWithEmailAndPassword(email, password);
      //Limpio la cache del estado actual
      this.setState({
        email: "",
        password: ""
      });
    } catch (error) {
      console.log(error);
    }*/
  };



  render() {
    const {googleSignInStart} = this.props;

    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            handleChange={this.handleChange}
            name="email"
            label="email"
            type="email"
            value={this.state.email}
            required
          />

          <FormInput
            handleChange={this.handleChange}
            label="password"
            name="password"
            type="password"
            value={this.state.password}
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
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart : (email,password) => dispatch(emailSignInStart({email,password}))
  

})

export default connect(null,mapDispatchToProps)(SignIn);

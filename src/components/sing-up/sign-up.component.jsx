import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import {signUpStart,proob, checkUserSession} from '../../redux/user/user.actions';
import {connect} from 'react-redux';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    const user = {displayName,email,password,confirmPassword};
    const {signUpStart} = this.props;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    signUpStart(user);
    
    /*

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      //vuelvo a los valores por defecto, no estoy muy seguro para que es esto...
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.log(error);
    }
    */
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />

          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>({
  signUpStart : user => dispatch(signUpStart(user)),
  checkUserSession : () => dispatch(checkUserSession())
  
})

export default connect(null,mapDispatchToProps) (SignUp);

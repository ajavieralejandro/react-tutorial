import React from "react";
import HomePage from "./pages/homepage/homepage.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {checkUserSession } from "./redux/user/user.actions";
//proob comment
//Firebase
import { selectToArray } from "./redux/shop/shop.selectors";

import "./App.css";
import {
  auth,
  createUserProfileDocument
} from "../src/firebase/firebase.utils";
import CheckOutPage from "./pages/checkout/checkout.component";

class App extends React.Component {
  //usa esta variable para cerrar la sesion...
  unsubscribeFromAuth = null;

  componentDidMount() {
    console.log("Me estoy fijando que esta pasando");
    const {checkUserSession} = this.props;
    const aux = checkUserSession();
    console.log("vino : ",aux);
 
  }

  componentWillUnmount() {
    //this.unsubscribeFromAuth();
  }

  handleRedirect = () => {
    console.log("Estoy justo aqui ");
    return this.props.currentUser ? (
      <Redirect to="/" />
    ) : (
      <SignInAndSignUpPage />
    );
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckOutPage} />
          <Route exact path="/signin" render={this.handleRedirect} />
        </Switch>
      </div>
    );
  }
}



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectToArray
});

const mapDispatchToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);

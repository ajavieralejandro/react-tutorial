import React , {useEffect} from "react";
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

import {GlobalStyle} from "./global.styles";
import CheckOutPage from "./pages/checkout/checkout.component";

//Solo lo ejecuta una ves
const App = ({checkUserSession,currentUser}) =>  {

  useEffect( () => {
    checkUserSession();

  },[checkUserSession])

  const handleRedirect = () => {
 
    return currentUser ? (
      <Redirect to="/" />
    ) : (
      <SignInAndSignUpPage />
    );
  };

  
    return (
      <div>
      <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckOutPage} />
          <Route exact path="/signin" render={handleRedirect} />
        </Switch>
      </div>
    );


  }




const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);

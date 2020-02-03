import React , {useEffect,lazy, Suspense} from "react";
import HomePage from "./pages/homepage/homepage.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/header/header.component";
import {checkUserSession } from "./redux/user/user.actions";
//proob comment
//Firebase


import {GlobalStyle} from "./global.styles";

//Solo lo ejecuta una ves
const App = ({checkUserSession,currentUser}) =>  {
  //lazy loading 

  const ShopPage = lazy(()=> import('./pages/shop/shop.component'));
  const CheckOutPage = lazy(()=> import('./pages/checkout/checkout.component'));
  const SignInAndSignUpPage = lazy(()=> import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));

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
          <Suspense fallback={<div>...Loading</div>}>
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckOutPage} />
          <Route exact path="/signin" render={handleRedirect} />
          </Suspense>
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

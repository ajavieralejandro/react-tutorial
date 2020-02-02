import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {signOutStart} from "../../redux/user/user.actions";
import {
  LogoContainer,
  OptionsContainer,
  OptionLink,
  OptionDiv,
  HeaderContainer
} from "./header.styles";

const Header = ({ currentUser, cartHidden,signOut }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/shop">CONTACT</OptionLink>
      {currentUser ? (
        <OptionDiv  as="div" onClick={signOut}>
          SIGN OUT
        </OptionDiv>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}
      <CartIcon /> 
    </OptionsContainer>
    {cartHidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartHidden: selectCartHidden
});

const mapDispatchToProps = dispatch =>({
  signOut: () => dispatch(signOutStart())
})


export default connect(mapStateToProps,mapDispatchToProps)(Header);

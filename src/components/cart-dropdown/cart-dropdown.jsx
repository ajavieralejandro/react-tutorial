import React from "react";
import "./cart-dropdown.styles.scss";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

const CartDropdown = ({ cartItems, history, dispatch }) => {
  const handleClick = () => {
    dispatch(toggleCartHidden());
    history.push(`/checkout`);
  };
  return (
    <div className="cart-dropdown">
      {cartItems.length ? (
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <span className="emptyCart">No items yet</span>
      )}

      <CustomButton onClick={handleClick}>Go to CheckOut</CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));

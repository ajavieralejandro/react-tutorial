import { createSelector } from "reselect";

export const selectCart = state => state.cart;
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.cartHidden
);

export const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce(
    (acumulator, currentElement) =>
      acumulator + currentElement.quantity * currentElement.price,
    0
  )
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    { console.log("Cart Items es : ",cartItems);
      return cartItems.reduce(
      (acumulator, currentElement) => acumulator + currentElement.quantity,
      0
    )
    }
);

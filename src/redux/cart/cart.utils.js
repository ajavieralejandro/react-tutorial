export const addItemToCart = (cartItems, cartItemToAdd) => {
  let toR;
  if (cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)) {
    toR = cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1
          }
        : cartItem
    );
  } else toR = [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  return toR;
};

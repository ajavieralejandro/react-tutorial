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

export const deleteItemToCart = (cartItems, itemToDelete) => {
  let toR = cartItems.filter(item => item.id !== itemToDelete.id);
  return toR;
};

export const removeItemToCart = (cartItems, itemToRemove) => {
  let toR;
  const existingItem = cartItems.find(item => item.id === itemToRemove.id);
  if (existingItem.quantity === 1)
    toR = deleteItemToCart(cartItems, itemToRemove);
  else
    toR = cartItems.map(cartItem =>
      cartItem.id === itemToRemove.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity - 1
          }
        : cartItem
    );
  return toR;
};

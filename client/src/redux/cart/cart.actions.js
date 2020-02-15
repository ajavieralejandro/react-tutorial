import CartActionTypes from "./cart.types";

export const getCartFromFirebase = (uid) => ({
  type : CartActionTypes.GET_CART_FROM_FIREBASE,
  payload : uid
})


export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const deleteItem = item => ({
  type: CartActionTypes.DELETE_ITEM,
  payload: item
});

export const setCartItems = items =>({
  type : CartActionTypes.SET_CART_ITEMS,
  payload : items
})

export const clearCart = () => ({
  type : CartActionTypes.CLEAR_CART
})

export const saveCart = (userId) =>({
  type : CartActionTypes.SAVE_CART_ITEMS,
  payload : userId
})

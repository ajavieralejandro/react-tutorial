import CartActionTypes from "./cart.types";
import {
  addItemToCart,
  deleteItemToCart,
  removeItemToCart
} from "../cart/cart.utils";

const INITIAL_STATE = {
  cartHidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        cartHidden: !state.cartHidden
      };

    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };

    case CartActionTypes.DELETE_ITEM:
      return {
        ...state,
        cartItems: deleteItemToCart(state.cartItems, action.payload)
      };

    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemToCart(state.cartItems, action.payload)
      };

      case CartActionTypes.CLEAR_CART : 
      return {
        ...state,
        cartItems : [],
        cartHidden : true
      }

    default:
      return state;
  }
};

export default cartReducer;

import {all, call,takeLatest, put} from 'redux-saga/effects';
import UserActionTypes from '../user/user.types';
import {clearCart} from './cart.actions';
import {getUserCart,writeUserCart} from '../../firebase/firebase.utils';
import {select} from 'redux-saga/effects';
import * as selectors from './cart.selectors';
import {setCartItems} from './cart.actions';
import CartActionTypes from './cart.types';


export function* clearCartOnSignOut(){
    yield put(clearCart());
}

export function* getFirebaseCart(action){
    //Este script ya fue ejecutado en la primera pasada
    //yield addCart();
    yield console.log("Estoy recibiendo como parametro : ",action);
    const {cart} = yield getUserCart(action.payload);
    console.log("Lo que estoy recibiendo como cart es : ",cart);
    yield put(setCartItems(cart));
    yield console.log("termine mi operacion");
}

export function* onGetCart(){
    const action = yield takeLatest(CartActionTypes.GET_CART_FROM_FIREBASE,getFirebaseCart);
}

export function* saveCart(action){
    console.log("Quiero ver si llego a saveCart con : ",action);
    //Es importante tener en cuenta que no funciona sin el yield
    //tambien que solo sirve para importar todo el estado y no los selectores...
    //abría que ver una manera de usarlo con los selectores.. 
    const cartState = yield select(selectors.selectCart);
    const cart = cartState.cartItems;
    const toAdd = {cart:cart,id:action.payload};
    console.log("Estoy por insertar",toAdd);
    yield writeUserCart(action.payload,toAdd);
}


export function* onSaveCart (){
    const action = yield takeLatest(CartActionTypes.SAVE_CART_ITEMS,saveCart);
}

export function* onSignOutSuccess(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS,clearCartOnSignOut);
}


export function* cartSagas() {
    yield(all([call(onSignOutSuccess),call(onGetCart),call(onSaveCart)]));
}
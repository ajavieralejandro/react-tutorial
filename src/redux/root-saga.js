import {all, call} from 'redux-saga/effects';
import {fetchCollectionsStart} from './shop/shop.sagas';
import {userSagas} from "./user/user.sagas";
//Aplica todas las sagas al middleware
export default function* rootSaga(){
    yield all([call(fetchCollectionsStart),call(userSagas)]);
}
import {takeLatest,call,put} from 'redux-saga/effects';
import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import ShopActionTypes from  "./shop.types";

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from "./shop.actions";


export function*  fetchCollecionsAsync(){
    yield console.log("I am fired");
    //Saga async logic sintax...
    try{
        const collectionRef = firestore.collection('collections');
        yield console.log("I am fired 2");
        const snapshot = yield collectionRef.get();
        yield console.log("I am fired 3");
        const collectionsMap = yield call (convertCollectionsSnapshotToMap , snapshot);        
        yield console.log("I am fired 4");
        yield put(fetchCollectionsSuccess(collectionsMap));
        yield console.log("I am fired 5");
    }
    catch(error){yield put(fetchCollectionsFailure(error.message))};
 
  

}

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollecionsAsync);

}

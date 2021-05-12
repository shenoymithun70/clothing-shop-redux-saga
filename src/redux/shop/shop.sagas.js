import { takeLatest , call , put } from 'redux-saga/effects'
import {firestore , convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {fetchCollectionSuccess , fetchCollectionsFailure } from './shop.actions'
import ShopActionTypes from './shop.types'

export function* fetchCollectionsAsync() {
    // yield console.log('I am fired')
    
    try {
        const collectionRef =  firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap))
    } catch(error) {    
        yield put(fetchCollectionsFailure(error.message))
    }   
    // dispatch(fetchCollectionsStart());
    // collectionRef.get().then( snapshot => {
    // const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    // dispatch(fetchCollectionSuccess(collectionsMap));
    // }).catch(error => dispatch(fetchCollectionsFailure(error.message))); 
}


export function* fetchCollectionStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync )
}
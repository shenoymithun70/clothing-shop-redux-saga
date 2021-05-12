
import ShopActionTypes from './shop.types'
import {firestore , convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'


export const fetchCollectionSuccess = collectionMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
})


export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
})


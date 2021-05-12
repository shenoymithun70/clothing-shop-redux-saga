import { createStore , applyMiddleware } from 'redux';
import logger from 'redux-logger'
import { persistStore } from 'redux-persist'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import {fetchCollectionStart} from './shop/shop.sagas'
import rootReducer from './root-reducer';
import rootSaga from './root-saga.js'

const sagaMiddleware = createSagaMiddleware();

const middlewares = [ sagaMiddleware  , logger];


export const store = createStore(rootReducer , applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);


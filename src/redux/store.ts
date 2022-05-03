import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleWare from 'redux-thunk';
import {rootReducer} from './reducers';

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))


// типизация самого объекта стор
export type StoreType = typeof store

// @ts-ignore
window.store = store
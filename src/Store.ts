import {createStore, applyMiddleware, Store, combineReducers} from 'redux';
import {syncHistory, routeReducer} from 'react-router-redux';
const thunkMiddleware = require('redux-thunk');
//const createLogger = require('redux-logger');

import * as MainReducers from './Main/Reducers';

// , createLogger()

const store:Store = createStore(
  combineReducers(MainReducers), {},
  applyMiddleware(thunkMiddleware)
)

function replaceReducers(SubReducers) {
  store.replaceReducer(combineReducers(Object.assign({}, MainReducers, SubReducers)));
}

export {store, replaceReducers}
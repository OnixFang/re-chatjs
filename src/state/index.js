import { combineReducers, createStore } from 'redux';
import userReducer from './user/reducer';
import roomsReducer from './rooms/reducer';

const store = createStore(
  combineReducers({ user: userReducer, rooms: roomsReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

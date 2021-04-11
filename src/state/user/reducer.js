import * as actions from './actionTypes';

export default function userReducer(state = null, action) {
  switch (action.type) {
    case actions.USER_ADDED:
      return action.payload;

    case actions.USER_REMOVED:
      return null;

    default:
      return state;
  }
}

import * as actions from './actionTypes';

export default function roomReducer(state = [], action) {
  switch (action.type) {
    case actions.ROOM_ADDED:
      return [...state, action.payload];
    case actions.ROOM_REMOVED:
      return state.filter((room) => room.name === action.payload);

    default:
      return state;
  }
}

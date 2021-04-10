import * as actions from './actionTypes';

const defaultRoom = {
  name: 'Live chat',
  image: './assets/group.svg',
  users: [],
  messages: [],
  active: false,
};

export default function roomsReducer(state = [], action) {
  switch (action.type) {
    case actions.ROOM_ADDED:
      return [...state, action.payload];
    case actions.ROOM_REMOVED:
      return state.filter((room) => room.name === action.payload);

    default:
      return [...state, defaultRoom];
  }
}

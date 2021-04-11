import * as actions from './actionTypes';

const defaultRoom = {
  name: 'Live chat',
  image: './assets/group.svg',
  users: [],
  messages: [],
  active: false,
  createdDate: 1617549000047,
  updatedDate: 1617549000047,
};

export default function roomsReducer(state = [], action) {
  switch (action.type) {
    case actions.ROOM_ADDED:
      return [...state, action.payload];

    case actions.ROOM_REMOVED:
      return state.filter((room) => room.name === action.payload);

    case actions.ROOM_ACTIVATED:
      return state.map((room) => {
        if (room.name === action.payload.name) {
          room.active = true;
        } else {
          room.active = false;
        }
        return room;
      });

    case actions.MESSAGE_ADDED:
      return state.map((room) => {
        if (room.name === action.payload.room) {
          room.messages = [...room.messages, action.payload];
        }
        return room;
      });

    case actions.USERS_ADDED:
      return state.map((room) => {
        if (room.name === action.payload.room) {
          room.users = action.payload.users;
        }
        return room;
      });

    default:
      return [defaultRoom];
  }
}

import * as actions from './actionTypes';

export const addRoom = (room) => {
  return {
    type: actions.ROOM_ADDED,
    payload: room,
  };
};

export const removeRoom = (roomName) => {
  return {
    type: actions.ROOM_REMOVED,
    payload: roomName,
  };
};

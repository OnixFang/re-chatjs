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

export const activateRoom = (room) => {
  return {
    type: actions.ROOM_ACTIVATED,
    payload: room,
  };
};

export const addMessage = (message) => {
  return {
    type: actions.MESSAGE_ADDED,
    payload: message,
  };
};

export const addUsers = (room) => {
  return {
    type: actions.USERS_ADDED,
    payload: room,
  };
};

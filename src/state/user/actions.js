import * as actions from './actionTypes';

export const addUser = (user) => {
  return {
    type: actions.USER_ADDED,
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: actions.USER_REMOVED,
  };
};

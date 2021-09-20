import { SET_SCORE, SET_USER, UPDATE_USER_LIST } from "./actionNames";

export const setUserName = (name) => {
  return (dispatch) =>
    dispatch({
      type: SET_USER,
      payload: name,
    });
};

export const setUserScore = async (score) => {
  return (dispatch) =>
    dispatch({
      type: SET_SCORE,
      payload: score,
    });
};

export const updateUserList = (name) => {
    return (dispatch) =>
      dispatch({
        type: UPDATE_USER_LIST,
        payload: name,
      });
  };
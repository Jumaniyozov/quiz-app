import { SET_SCORE, SET_USER, UPDATE_USER_LIST } from "../actions/actionNames";

const userReducer = (
  state = { name: "", score: 0, userList: [] },
  action
) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, name: action.payload };
    case SET_SCORE:
      return { ...state, score: action.payload };
    case UPDATE_USER_LIST:
      return {
        ...state,
        userList: [
          ...state.userList,
          {
            name: action.payload.name,
            score: action.payload.score,
            time: action.payload.time
          },
        ],
      };
    default:
      return state;
  }
};

export default userReducer;

import { GET_COMMENTS } from "../actions/types";

const initState = [];

const commentsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_COMMENTS.FINISHED:
      return action.payload;
    default:
      return state;
  }
};

export default commentsReducer;
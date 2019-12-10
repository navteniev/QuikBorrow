import { GET_USER } from '../actions/types';

const initState = {};

const userReducer = (state = initState, action) => {
    switch (action.type) {
      case GET_USER.FINISHED:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default userReducer;

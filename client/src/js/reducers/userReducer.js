import { GET_USER_PROFILE, GET_ERRORS } from '../actions/types';

const initState = {};

const userReducer = (state = initState, action) => {
    switch (action.type) {
      case GET_USER_PROFILE:
        return action.payload;
      case GET_ERRORS:
          return action.payload;
      default:
        return state;
    }
  };
  
  export default userReducer;

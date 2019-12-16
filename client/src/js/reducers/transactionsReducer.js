import {
    FETCH_TRANSACTIONS
  } from "../actions/types";
  
  const initState = {
    fetching: false,
    data: []
  };
  
  const transactionsReducer = (state = initState, action) => {
    switch (action.type) {
      case FETCH_TRANSACTIONS.FETCHING:
        return {
          ...state,
          fetching: true
        }
      case FETCH_TRANSACTIONS.FINISHED:
        return {
          fetching: false,
          data: action.payload
        };
      default:
        return state;
    }
  };
  
  export default transactionsReducer;
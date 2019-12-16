import {
    FETCH_TRANSACTIONS
  } from "../actions/types";
  
  const initState = [];
  
  const transactionsReducer = (state = initState, action) => {
    switch (action.type) {
      case FETCH_TRANSACTIONS.FINISHED:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default transactionsReducer;
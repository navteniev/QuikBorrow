import { FETCH_PRODUCTS } from "../actions/types";

const initState = [];

const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

export default productsReducer;

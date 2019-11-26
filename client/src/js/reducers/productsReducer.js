import {
  FETCH_PRODUCTS,
  SEARCH,
  BORROW_PRODUCT_FINISHED
} from "../actions/types";

const initState = [];

const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    case SEARCH:
      return action.payload;
    case BORROW_PRODUCT_FINISHED:
      const updatedItem = action.payload
      return state.map(item => item._id === updatedItem._id ? item : [ ...item, ...updatedItem ])
    default:
      return state;
  }
};

export default productsReducer;

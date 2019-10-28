import axios from "axios";

import { FETCH_PRODUCTS, FETCH_PRODUCT } from "./types";

// Fetch all products
export const fetchProducts = () => {
  return async function(dispatch) {
    const res = await axios.post("/server/items/retrieveall");
    dispatch({ type: FETCH_PRODUCTS, payload: res.data });
  };
};

// Get one product
export const fetchProduct = itemId => {
  return async function(dispatch) {
    const res = await axios.post("/server/items/retrieve", {
      itemId: itemId
    });
    dispatch({ type: FETCH_PRODUCT, payload: res.data });
  };
};

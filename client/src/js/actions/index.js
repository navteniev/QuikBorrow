import axios from "axios";
import { FETCH_PRODUCTS, FETCH_PRODUCT, SEARCH_PRODUCTS, GET_USER } from "./types";
export * from './products';

// Fetch all products
export const fetchProducts = () => {
  return async function(dispatch) {
    const res = await axios.get("/api/items");
    dispatch({ type: FETCH_PRODUCTS, payload: res.data });
  };
};

// Get one product
export const fetchProduct = itemId => {
  return async function(dispatch) {
    const res = await axios.get(`/api/items/${itemId}`);
    dispatch({ type: FETCH_PRODUCT, payload: res.data });
  };
};

/**
 *  Search by query for items in database by calling {@link Action} to backend
 *  @param {String} query - query string to search
 *  @returns {Function} dispatch - used to dispatch actions
 */
export const searchProducts = query => 
  /**
   *  @param {Function} dispatch - used to dispatch actions
   *  @returns {Promise<Object>} - response from an {@link Action}
   */
  dispatch => {
    return axios
        .get("/api/items/search", { params: { param: query} })
        .then(res => {
          dispatch({ type: SEARCH_PRODUCTS.FINISHED, payload: res.data });
        })
        .catch(err => {
          dispatch({
            type: SEARCH_PRODUCTS.ERROR,
            payload: err.response.data
          })
        });
  };

export const getUserProfile = userId => {
  return async function(dispatch) {
    try {
    const res = await axios.get(`/api/users/${userId}`);
    dispatch({ type: GET_USER.FINISHED, payload: res.data });
  }
  catch(error) {
    console.log(error)
    dispatch({
      type: GET_USER.ERROR, payload: error
      });
    }
  }
};

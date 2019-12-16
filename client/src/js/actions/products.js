import axios from "axios";
import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT,
    SEARCH_PRODUCTS,
    REQUEST_BORROW_PRODUCT,
    FETCH_TRANSACTIONS
} from './types'

/**
 * @typedef {import('redux').Dispatch} DispatchFunction
 */

/**
 * Borrow an item via fetch
 * 
 * @param {Object} item - The Item object to borrow
 * @param {string} msg - The message for the lender
 * @returns {DispatchFunction}
 */
export const requestBorrowProductFetch = (item, msg) => async (dispatch, getState) => {
    const state = getState()
    const body = {
        borrowerId: state.auth.user.id,
        lenderId: item.user,
        itemId: item._id,
        msg
    }
    return axios.post(`/api/transactions`, body)
        .then(({ data }) => {
            dispatch({ type: REQUEST_BORROW_PRODUCT.FINISHED, payload: data })
        })
        .catch(err => {
            dispatch({ type: REQUEST_BORROW_PRODUCT.ERROR, payload: err.response.data })
        })
}

/**
 * Fetch all products
 * @returns {DispatchFunction}
 */
export const fetchProducts = () => {
  return async function(dispatch) {
    const res = await axios.get("/api/items");
    dispatch({ type: FETCH_PRODUCTS, payload: res.data });
  };
};

/**
 * Get one product
 * 
 * @param {Object} itemId - The id of the item to retrieve
 * @returns {DispatchFunction}
 */
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

  /**
 * Get all current user transactions
 * 
 * @param {Object} id - The user id
 * @returns {Function} dispatch - used to dispatch actions
 */

 export const fetchTransactions = (id) => 
  /**
   *  @param {Function} dispatch - used to dispatch actions
   *  @returns {Promise<Object>} - response from an {@link Action}
   */
  dispatch => {
    return axios.post('/api/transactions/getTransactions', {userId : id})
        .then(res => dispatch({ type: FETCH_TRANSACTIONS.FINISHED, payload: res.data }))
        .catch(err => dispatch({ type: FETCH_TRANSACTIONS.ERROR, payload: err.response.data }))
 }


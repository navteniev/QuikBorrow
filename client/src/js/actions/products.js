import axios from "axios";
import {
    REQUEST_BORROW_PRODUCT
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
        lender: item.user,
        itemId: item._id,
        msg
    }
    return axios.post(`/api/transactions`, body)
        .then(({ data }) => dispatch({ type: REQUEST_BORROW_PRODUCT.FINISHED, payload: data }))
        .catch(err => dispatch({ type: REQUEST_BORROW_PRODUCT.ERROR, payload: err.response.data }))
}

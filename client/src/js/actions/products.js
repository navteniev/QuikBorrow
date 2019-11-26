import axios from "axios";
import {
    BORROW_PRODUCT_FINISHED,
    GET_ERRORS 
} from './types'

/**
 * @typedef {import('redux').Dispatch} DispatchFunction
 */

/**
 * Borrow an item via fetch
 * 
 * @param {Object} item - The Item object to borrow
 * @returns {DispatchFunction}
 */
export const borrowProductFetch = item => async (dispatch, getState) => {
    const state = getState()
    const body = {
        borrowerId: state.auth.user.id,
        lender: item.user,
        itemId: item._id,
        msg: 'Made from web'
    }
    axios.post(`/api/transactions`, body)
        .then(({ data }) => dispatch({ type: BORROW_PRODUCT_FINISHED, payload: data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

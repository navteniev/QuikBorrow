import axios from "axios";
import { GET_COMMENTS, GET_ERRORS } from './types';

/**
 * @typedef {import('redux').Dispatch} DispatchFunction
 */

/**
 * Create a comment
 * 
 * @param {Object} comment - The Comment object to create
 * @returns {DispatchFunction}
 */
export const createComment = (comment) => dispatch => {
  return axios
    .post("/api/comments", comment)
    .then(res => {
    	console.log(res);
    	console.log(comment);
    })
    .catch(err => {
    	console.log(err);
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
    });
};

/**
 * @typedef {import('redux').Dispatch} DispatchFunction
 */

/**
 *  Get comments associated with product
 *  @param {String} id - object id of product
 *  @returns {DispatchFunction} dispatch - used to dispatch actions
 */
export const getComments = id => {
  return async function(dispatch) {
    const res = await axios.get(`/api/comments/${id}`);
    dispatch({ type: GET_COMMENTS, payload: res.data });
  };
};
import axios from "axios";
import { CREATE_COMMENT, GET_COMMENTS } from './types';

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
  			type: CREATE_COMMENT.ERROR,
  			payload: err.response.data
  		})
    });
};

/**
 *  Get comments associated with product
 *  @param {String} id - object id of product
 *  @returns {DispatchFunction} dispatch - used to dispatch actions
 */
export const getComments = (id) => dispatch => {
  return axios
    .get(`/api/comments/${id}`)
    .then(res => {
      dispatch({
        type: GET_COMMENTS.FINISHED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_COMMENTS.ERROR,
        payload: err.response.data
      })
    });
};
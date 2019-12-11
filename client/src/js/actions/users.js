import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, USER_LOADING, REGISTER_USER, LOGIN_USER, GET_USER } from "./types";

/**
 * @typedef {import('redux').Dispatch} DispatchFunction
 */

/**
 *	Register user 
 *	@param {Object} userData - User credentials to create an account
 *	@param {Object} history - used to navigate to different pages
 *	@returns {DispatchFunction}
 */
export const registerUser = (userData, history) => dispatch => {
  return axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: REGISTER_USER.ERROR,
        payload: err.response.data
      })
    );
};

/**
 *	Login user 
 *	@param {Object} userData - User credentials to login
 *	@returns {DispatchFunction}
 */
export const loginUser = userData => dispatch => {
  return axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: LOGIN_USER.ERROR,
        payload: err.response.data
      })
    );
};

/**
 *	Set current user
 *	@param {Object} decoded - decoded jwtToken containing user info
 *	@returns {Object}
 */
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

/**
 *	Set user loading
 *	@returns {Object}
 */
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

/**
 *	Logout user by removing auth token and saved info in storage
 *	@returns {DispatchFunction}
 */
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

/**
 *	Get user profile
 *	@param {Object} userId - get profile based on userId
 *	@returns {DispatchFunction}
 */
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
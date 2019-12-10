import { CLEAR_ALL_ERRORS } from '../actions/types'

const initialState = {};

/**
 * 
 * @param {Object} state 
 * @param {Object} action
 * @param {string} action.type
 * @param {*} action.payload
 */
export default function(state = initialState, action) {
  if (!action.type) {
    return state
  }

  if (action.type === CLEAR_ALL_ERRORS) {
    return {}
  }

  const isError = action.type.endsWith('_ERROR')
  const isFinish = action.type.endsWith('_FINISHED')

  if (!isError && !isFinish) {
    return state
  }

  const stateKey = action.type.replace(/_ERROR|_FINISHED/g, '')

  /**
   * Remove the error object if this is a _FINISHED action
   * by creating a clone to maintain immutability
   */
  if (isFinish) {
    return Object.keys(state).reduce((newState, key) => {
      if (key !== stateKey) {
        newState[key] = state[key]
      }
      return newState
    }, {})
  }

  /**
   * We can do stuff to the error here if we want to reduce
   * the ridiculous layers of information an Axios error
   * normally contains
   */
  
  return { ...state, [stateKey]: action.payload }
}

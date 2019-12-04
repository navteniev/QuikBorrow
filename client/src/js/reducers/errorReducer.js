const initialState = {};

/**
 * 
 * @param {Object} state 
 * @param {Object} action
 * @param {string} action.type
 * @param {*} action.payload
 */
export default function(state = initialState, action) {
  const isError = !action.type || action.type.endsWith('_ERROR')
  if (!isError) {
    return state
  }
  /**
   * We can do stuff to the error here if we want to reduce
   * the ridiculous layers of information an Axios error
   * normally contains
   */
  
  return { ...state, [action.type]: action.payload }
}

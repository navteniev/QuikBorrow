import { CLEAR_ALL_ERRORS } from './types'

/**
 * Clears all error data in error state for all error types
 */
 export const clearAllErrors = () => {
     return { type: CLEAR_ALL_ERRORS }
 }

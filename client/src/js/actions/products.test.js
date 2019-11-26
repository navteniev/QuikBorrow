import { borrowProductFetch } from './products'
import { BORROW_PRODUCT_FINISHED, GET_ERRORS } from './types'
import axios from 'axios'

jest.mock('axios')

describe('actions/products', () => {
    describe('borrowProductFetch', () => {
        it('should make the axios post with the right body', async () => {
            axios.post.mockResolvedValueOnce({})
            const state = {
                auth: {
                    user: {
                        id: 'PRAISE'
                    }
                }
            }
            const item = {
                _id: 'THE',
                user: 'SUN'
            }
            const message = 'GIT BOI'
            const expectedBody = {
                borrowerId: state.auth.user.id,
                lender: item.user,
                itemId: item._id,
                msg: message
            }
            const dispatch = jest.fn()
            const getState = jest.fn(() => state)
            await borrowProductFetch(item, message)(dispatch, getState)
            expect(axios.post).toHaveBeenCalledWith('/api/transactions', expectedBody)
        })
        it('should dispatch the correct action on fetch success', async () => {
            const resolvedData = { data: [1,2,3,4,5] }
            axios.post.mockResolvedValueOnce(resolvedData)
            const state = {
                auth: {
                    user: {}
                }
            }
            const dispatch = jest.fn()
            const getState = jest.fn(() => state)
            const expectedAction = {
                type: BORROW_PRODUCT_FINISHED,
                payload: resolvedData.data
            }
            await borrowProductFetch({})(dispatch, getState)
            expect(dispatch).toHaveBeenCalledWith(expectedAction)
        })
        it('should dispatch the correct action on fetch error', async () => {
            const error = {
                response: {
                    data: 'BOIIIIIIIIIIIIIIIIIIIIIII'
                }
            }
            axios.post.mockRejectedValueOnce(error)
            const state = {
                auth: {
                    user: {}
                }
            }
            const dispatch = jest.fn()
            const getState = jest.fn(() => state)
            const expectedAction = {
                type: GET_ERRORS,
                payload: error.response.data
            }
            await borrowProductFetch({})(dispatch, getState)
            expect(dispatch).toHaveBeenCalledWith(expectedAction)
        })
    })
})

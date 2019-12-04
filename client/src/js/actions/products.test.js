import { requestBorrowProductFetch } from './products'
import { REQUEST_BORROW_PRODUCT_FINISHED, GET_ERRORS } from './types'
import axios from 'axios'

jest.mock('axios')

describe('actions/products', () => {
    describe('requestBorrowProductFetch', () => {
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
            await requestBorrowProductFetch(item, message)(dispatch, getState)
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
                type: REQUEST_BORROW_PRODUCT_FINISHED,
                payload: resolvedData.data
            }
            await requestBorrowProductFetch({})(dispatch, getState)
            expect(dispatch).toHaveBeenCalledWith(expectedAction)
        })
        it('should dispatch the correct action on fetch error', async () => {
            const error = {
                response: {
                    data: 'Ade[hijordeh'
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
            await requestBorrowProductFetch({})(dispatch, getState)
            expect(dispatch).toHaveBeenCalledWith(expectedAction)
        })
    })
})

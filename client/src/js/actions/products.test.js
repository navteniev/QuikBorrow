import { requestBorrowProductFetch, searchProducts, fetchProducts, fetchProduct } from './products'
import { FETCH_PRODUCTS, FETCH_PRODUCT, SEARCH_PRODUCTS, REQUEST_BORROW_PRODUCT } from './types'
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
                type: REQUEST_BORROW_PRODUCT.FINISHED,
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
                type: REQUEST_BORROW_PRODUCT.ERROR,
                payload: error.response.data
            }
            await requestBorrowProductFetch({})(dispatch, getState)
            expect(dispatch).toHaveBeenCalledWith(expectedAction)
        })
    })

    describe('fetchProducts', () => {
        let mock;
        beforeEach(() => {
            mock = jest.spyOn(axios, 'get');
        });
        afterEach(() => {
            mock.mockRestore();
        });
        test('fetchProducts', async () => {
            const dispatch = jest.fn();
            mock.mockResolvedValue({ data: {}});
            await fetchProducts()(dispatch);
            expect(mock).toHaveBeenCalledWith('/api/items');
        });
    });

    describe('fetchProduct', () => {
        let mock;
        beforeEach(() => {
            mock = jest.spyOn(axios, 'get');
        });
        afterEach(() => {
            mock.mockRestore();
        });
        test('fetchProducts', async () => {
            const dispatch = jest.fn();
            mock.mockResolvedValue({ data: {}});
            await fetchProduct('someid')(dispatch);
            expect(mock).toHaveBeenCalledWith('/api/items/someid');
        });
    });

    describe('searchProducts', () => {
        let mock;
        beforeEach(() => {
            mock = jest.spyOn(axios, 'post');
        });
        afterEach(() => {
            mock.mockRestore();
        });
        test('searchProducts', async () => {
            let getMock = jest.spyOn(axios, 'get');
            const dispatch = jest.fn();
            getMock.mockResolvedValue({ data: {}});
            await searchProducts('chair')(dispatch);
            expect(getMock).toHaveBeenCalledWith('/api/items/search', { params: { param: "chair" }});
        });
        test('error dispatched', async () => {
            let getMock = jest.spyOn(axios, 'get');
            const dispatch = jest.fn();
            const mockedError = {
                response: {
                    data: 'test error'
                }
            }
            getMock.mockRejectedValueOnce(mockedError);
            await searchProducts('chair')(dispatch);
            expect(dispatch).toHaveBeenCalledWith({
                type: SEARCH_PRODUCTS.ERROR,
                payload: mockedError.response.data
            });
        });
    });
})

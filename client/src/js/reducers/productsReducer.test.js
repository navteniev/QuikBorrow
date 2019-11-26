import productsReducer from './productsReducer';
import * as types from '../actions/types';

describe('productsReducer', () => {
    it('should return the initial state', () => {
        expect(productsReducer([], {})).toEqual([])
    })

    it('should handle FETCH_PRODUCTS', () => {
	const payload = {
	    availability: true,
	    description: "test description",
	    name: "test name",
	    user: "5dbcedbc2f01110000da8ac8",
	    _id: "5dbcedae1c9d4400009df4a5" 
        }
        expect(
            productsReducer([], {
                type: types.FETCH_PRODUCTS,
                payload: [{ ...payload }]
            })
        ).toEqual([payload])
    })

    it('should handle BORROW_PRODUCT_FINISHED correctly', () => {
        const updatedItem = {
            _id: 'abcde',
            key: 123
        }
        const action = {
            type: types.BORROW_PRODUCT_FINISHED,
            payload: updatedItem
        }
        const initialState = [
            {
                _id: updatedItem._id + 1,
                key: 547
            },{
                _id: updatedItem._id,
                key: 666
            }, {
                _id: updatedItem._id + 2,
                key: 'reno 911'
            }
        ]
        const expectedState = [
            { ...initialState[0] },
            { ...initialState[1], ...updatedItem },
            { ...initialState[2] }
        ]
        const returnedState = productsReducer(initialState, action)
        expect(returnedState).toEqual(expectedState)
    })
})

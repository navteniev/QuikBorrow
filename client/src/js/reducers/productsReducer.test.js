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
})

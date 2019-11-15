import productReducer from './productReducer';
import * as types from '../actions/types';

describe('productReducer', () => {
    it('should return the initial state', () => {
        expect(productReducer([], {})).toEqual([])
    })

    it('should handle FETCH_PRODUCT', () => {
	const payload = {
	    availability: true,
	    description: "test description",
	    name: "test name",
	    user: "5dbcedbc2f01110000da8ac8",
	    _id: "5dbcedae1c9d4400009df4a5" 
        }
        expect(
            productReducer([], {
                type: types.FETCH_PRODUCT,
                payload: [{ ...payload }]
            })
        ).toEqual([payload])
    })
})
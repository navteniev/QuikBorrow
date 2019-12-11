import userReducer from './userReducer';
import * as types from '../actions/types';

describe('userReducer', () => {
    it('should return the initial state', () => {
        expect(userReducer({}, {})).toEqual({})
    })

    it('should handle GET_USER_PROFILE', () => {
	const payload = {
	    rating: 0,
        name: "test name",
        email: "test1@test.com",
	    _id: "5dbb0cc7edeea12284986dcc" 
        }
        expect(
            userReducer({}, {
                type: types.GET_USER.FINISHED,
                payload: { ...payload }
            })
        ).toEqual(payload)
    })
})

import { GET_ERRORS } from "../actions/types";
import errorReducer from './errorReducer';

describe('Error Reducer', () => {

	it('should return default state', () => {
		const newState = errorReducer({}, {});
		expect(newState).toEqual({})
	})

	it('should return errors', () => {
		const error = {
			error: 'Test error'
		}
		const newState = errorReducer({}, {
			type: GET_ERRORS,
			payload: {...error}
		});
		expect(newState).toEqual(error)
	})
});
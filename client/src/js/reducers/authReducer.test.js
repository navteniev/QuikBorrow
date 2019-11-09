import {
  SET_CURRENT_USER,
  USER_LOADING
} from "../actions/types";
import authReducer from './authReducer';

describe('Auth Reducer', () => {
	const initialState = {
	  isAuthenticated: false,
	  user: {},
	  loading: false
	};

	it('should return default state', () => {
		const newState = authReducer(initialState, {});
		expect(newState).toEqual(initialState)
	})

	it('should return payload as user', () => {
		const user = {
			name: 'Test',
			email: 'test@test.com'
		}
		const newState = authReducer(initialState, {
			type: SET_CURRENT_USER,
			payload: user
		})
		expect(newState.user).toEqual(user)
	})

	it('should be loading', () => {
		const newState = authReducer(initialState, {
			type: USER_LOADING
		})
		expect(newState.loading).toBe(true)

	})
});
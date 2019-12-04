import errorReducer from './errorReducer';

describe('Error Reducer', () => {
	it('should return default state', () => {
		const newState = errorReducer({}, {});
		expect(newState).toEqual({})
	})

	it('returns original state if not error payload', () => {
		const state = { foo: 1 }
		expect(errorReducer(state, { type: 'HERP DERP' })).toEqual(state)
		expect(errorReducer(state, {})).toEqual(state)
	})

	it('sets the error in the right place', () => {
		const state = { jingle: 'bells' }
		const payload = { foo: 'gosh darnit bobby' }
		const action = { type: 'a_ERROR', payload }
		const returned = errorReducer(state, action)
		expect(returned).toEqual({ ...state, [action.type]: action.payload })
	})
});
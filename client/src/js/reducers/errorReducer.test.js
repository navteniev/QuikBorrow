import errorReducer from './errorReducer';

describe('Error Reducer', () => {
	it('should return default state', () => {
		const newState = errorReducer({}, {});
		expect(newState).toEqual({})
	})

	it('returns original state if not error payload', () => {
		const state = { foo: 1 }
		const stateCopy = { ...state }
		expect(errorReducer(state, { type: 'HERP DERP' })).toEqual(state)
		expect(errorReducer(state, {})).toEqual(stateCopy)
	})

	it('sets the error in the right place', () => {
		const state = { jingle: 'bells' }
		const stateCopy = { ...state }
		const payload = { foo: 'gosh darnit bobby' }
		const action = { type: 'a_ERROR', payload }
		const expectedStateKey = action.type.replace('_ERROR', '')
		const returned = errorReducer(state, action)
		expect(returned).toEqual({ ...state, [expectedStateKey]: action.payload })
		// Assert that the reducer did not illegally mutate state
		expect(state).toEqual(stateCopy)
	})

	it('removes the error from state if finished action', () => {
		const stateKey = 'randomErrorKey'
		const actionType = stateKey + '_FINISHED'
		const action = { type: actionType, payload: 1 }
		const state = { jingle: 'bells', [stateKey]: 1 }
		const stateCopy = { ...state }
		const returned = errorReducer(state, action)
		expect(returned).toEqual({ jingle: 'bells' })
		expect(state).toEqual(stateCopy)
	})
});
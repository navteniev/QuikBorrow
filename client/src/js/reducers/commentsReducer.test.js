import commentsReducer from './commentsReducer';
import { GET_COMMENTS } from '../actions/types';

describe('Comments reducer', () => {
	it('should return the initial state', () => {
        expect(commentsReducer([], {})).toEqual([]);
    });
    it('should return payload', () => {
    	const comment = {
			user: 'a',
			id: 'b',
			product: 'c',
			text: 'd',
			rating: 5
		}
		const newState = commentsReducer([], {
			type: GET_COMMENTS,
			payload: { ...comment }
		})
		expect(newState).toEqual(comment)
    });
});
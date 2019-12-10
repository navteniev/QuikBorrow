import axios from "axios";
import { createComment, getComments } from './comments';
import { CREATE_COMMENT } from './types';

describe('actions/comments', () => {
	describe('createComment', () => {
		const comment = {
			user: 'a',
			id: 'b',
			product: 'c',
			text: 'd',
			rating: 5
		}
		test('createComment', async () => {
			let postMock = jest.spyOn(axios, 'post');
			const dispatch = jest.fn();
		    postMock.mockResolvedValue();
		    await createComment(comment)(dispatch);
		    expect(postMock).toHaveBeenCalledWith('/api/comments', comment);
		});
		test('error dispatched', async () => {
			let postMock = jest.spyOn(axios, 'post');
			const dispatch = jest.fn();
			const mockedError = {
		    	response: {
		        	data: 'test error'
		      	}
		    }
		  	postMock.mockRejectedValueOnce(mockedError);
		  	await createComment(comment)(dispatch);
		  	expect(dispatch).toHaveBeenCalledWith({
		    	type: CREATE_COMMENT.ERROR,
		    	payload: mockedError.response.data
		  	});
		});
	});

	describe('getComments', () => {
		test('getComments', async () => {
			let getMock = jest.spyOn(axios, 'get');
			const dispatch = jest.fn();
		    getMock.mockResolvedValue({ data: {}});
		    await getComments('someid')(dispatch);
		    expect(getMock).toHaveBeenCalledWith('/api/comments/someid');
		});
	});
});
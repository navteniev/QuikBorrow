import axios from 'axios';
import * as actions from './index';
import { SEARCH_PRODUCTS } from "./types";

jest.mock('axios');

describe('actions', () => {
	let mock;
	beforeEach(() => {
		mock = jest.spyOn(axios, 'post');
	});
	afterEach(() => {
		mock.mockRestore();
	});

	describe('searchProducts', () => {
		test('searchProducts', async () => {
			let getMock = jest.spyOn(axios, 'get');
			const dispatch = jest.fn();
		    getMock.mockResolvedValue({ data: {}});
		    await actions.searchProducts('chair')(dispatch);
		    expect(getMock).toHaveBeenCalledWith('/api/items/search', { params: { param: "chair" }});
		});
		test('error dispatched', async () => {
			let getMock = jest.spyOn(axios, 'get');
			const dispatch = jest.fn();
			const mockedError = {
		    	response: {
		        	data: 'test error'
		      	}
		    }
		  	getMock.mockRejectedValueOnce(mockedError);
		  	await actions.searchProducts('chair')(dispatch);
		  	expect(dispatch).toHaveBeenCalledWith({
		    	type: SEARCH_PRODUCTS.ERROR,
		    	payload: mockedError.response.data
		  	});
		});
	});
});
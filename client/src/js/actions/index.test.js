import axios from 'axios';
import * as actions from './index';
import { GET_USER, LOGIN_USER, SEARCH_PRODUCTS } from "./types";

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

	describe('getUserProfile', () => {
		const resp = {
			data: {
			rating: 0,
			name: "test name",
			email: "test1@test.com",
			_id: "5dbb0cc7edeea12284986dcc"
			}
		}
		test('Successful getUserProfile', async () => {
			const dispatch = jest.fn();
			let mock = axios.get.mockResolvedValue(resp)
			await actions.getUserProfile(resp.data._id)(dispatch)
			expect(mock).toHaveBeenCalledWith('/api/users/'+resp.data._id) //asserting what im testing in line 87
			});

		test('Successful dispatched', async () => {
				const dispatch = jest.fn();
				axios.get.mockResolvedValue(resp)
				await actions.getUserProfile(resp)(dispatch)
				expect(dispatch).toHaveBeenCalledWith({
					type: GET_USER.FINISHED,
					payload: resp.data
					});
				});

		test('error dispatched', async () => {
			const dispatch = jest.fn();
			const mock_error = {
					data: 'test error',
					type: LOGIN_USER.ERROR,
		      	}
			  //axios.get.mockRejectedValue(resp);
			axios.get.mockRejectedValueOnce(mock_error);
		  	await actions.getUserProfile(mock_error)(dispatch);
		  	expect(dispatch).toHaveBeenCalledWith({
		    	type: GET_USER.ERROR,
		    	payload: mock_error
		  	});
		});
	});
});
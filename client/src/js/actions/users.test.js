import axios from 'axios';
import * as actions from './users';
import { REGISTER_USER, LOGIN_USER } from "./types";

jest.mock('axios');
jest.mock('../utils/setAuthToken');
jest.mock('jwt-decode');

describe('actions', () => {
	let mock;
	beforeEach(() => {
		mock = jest.spyOn(axios, 'post');
	});
	afterEach(() => {
		mock.mockRestore();
	});
	describe('registerUser', () => {
		test('registerUser', async () => {
			const push = jest.fn();
		    const history = { push };
		    const dispatch = jest.fn();
		    mock.mockResolvedValue();  // mock axios.post to resolve

		    await actions.registerUser('user data', history)(dispatch);

		    expect(mock).toHaveBeenCalledWith('/api/users/register', 'user data');  // Success!
		    expect(history.push).toHaveBeenCalledWith('/login');
		});

		test('error dispatched', async () => {
			const push = jest.fn();
		    const history = { push };
			const dispatch = jest.fn();
			const mockedError = {
		    	response: {
		        	data: 'test error'
		      	}
		    }
		  	mock.mockRejectedValueOnce(mockedError);
		  	await actions.registerUser('user data', history)(dispatch);
		  	expect(dispatch).toHaveBeenCalledWith({
		    	type: REGISTER_USER.ERROR,
		    	payload: mockedError.response.data
		  	});
		});
	});

	describe('loginUser', () => {
	    const userData = {
	    	email: 'test@test.com',
	    	password: 'password'
	    }
		test('successful post made', async () => {
			const dispatch = jest.fn();
			mock.mockResolvedValue({data: {}});
		    await actions.loginUser(userData)(dispatch);
		    expect(mock).toHaveBeenCalledWith('/api/users/login', userData); 
		});
		test('error dispatched', async () => {
			const dispatch = jest.fn();
			const mockedError = {
		    	response: {
		        	data: 'test error'
		      	}
		    }
		  	mock.mockRejectedValueOnce(mockedError);
		  	await actions.loginUser(userData)(dispatch);
		  	expect(dispatch).toHaveBeenCalledWith({
		    	type: LOGIN_USER.ERROR,
		    	payload: mockedError.response.data
		  	});
		});
	});

	test('setCurrentUser', () => {
		const setUser = actions.setCurrentUser('decoded');
		expect(setUser.payload).toEqual('decoded');
	});

	test('setUserLoading', () => {
		const setUser = actions.setUserLoading();
		expect(setUser.type).toEqual('USER_LOADING');
	});

	test('logoutUser', () => {
		const dispatch = jest.fn();
		actions.logoutUser()(dispatch);
		expect(dispatch).toHaveBeenCalledWith({"payload": {}, "type": "SET_CURRENT_USER"});
	});
});
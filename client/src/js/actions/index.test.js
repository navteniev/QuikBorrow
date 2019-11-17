import axios from 'axios';
import * as actions from './index';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

jest.mock('axios')
jest.mock('../utils/setAuthToken')
jest.mock('jwt-decode')

describe('actions', () => {
	let mock;
	beforeEach(() => {
		mock = jest.spyOn(axios, 'post');
	});
	afterEach(() => {
		mock.mockRestore();
	});

	test('registerUser', async () => {
		const push = jest.fn();
	    const history = { push };
	    const dispatch = jest.fn();
	    mock.mockResolvedValue();  // mock axios.post to resolve

	    await actions.registerUser('user data', history)(dispatch);

	    expect(mock).toHaveBeenCalledWith('/api/users/register', 'user data');  // Success!
	    expect(history.push).toHaveBeenCalledWith('/login');
	});

	describe('loginUser', () => {
		const dispatch = jest.fn();
	    const userData = {
	    	email: 'test@test.com',
	    	password: 'password'
	    }
		test('successful post made', async () => {
			mock.mockResolvedValue({data: {}});
		    await actions.loginUser(userData)(dispatch);
		    expect(mock).toHaveBeenCalledWith('/api/users/login', userData); 
		});
		test('error thrown', async () => {
			const mockedError = {
		    	response: {
		    		data: 'test error'
		    	}
		    }
		    mock.mockResolvedValue().mockRejectedValueOnce(mockedError);
		    await actions.loginUser(userData)(dispatch);
		    expect(mock).toHaveBeenCalledWith('/api/users/login', userData); 
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
		const logoutUser = actions.logoutUser()(dispatch);
		expect(dispatch).toHaveBeenCalledWith({"payload": {}, "type": "SET_CURRENT_USER"});
	});
});
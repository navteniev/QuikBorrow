import axios from 'axios';
import * as actions from './index';

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

	/*test('loginUser', async () => {
	    const dispatch = jest.fn();
	    const userData = {
	    	email: 'test@test.com',
	    	password: 'password'
	    }
	    mock.mockResolvedValue();  // mock axios.post to resolve
	    await actions.loginUser(userData)(dispatch);
	    expect(mock).toHaveBeenCalledWith('/api/users/login', userData);  // Success!
	});*/

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
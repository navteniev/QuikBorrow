import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Register } from './Register';
import { registerUser } from "../../actions/index";

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/index');

describe('Register', () => {
	const params = {
		registerUser: registerUser,
		auth: {
			isAuthenticated: false,
			user: {},
			loading: false
		},
		errors: {}
	}
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Register registerUser = {params.registerUser} auth = {params.auth} errors = {params.errors} />);
	});

	test('renders', () => {
		const component = renderer.create(
			<MemoryRouter>
				<Register registerUser = {params.registerUser} auth = {params.auth} errors = {params.errors} />
			</MemoryRouter>
		).toJSON();
		
		expect(component).toMatchSnapshot();
	});
	
	test('username entry', () => {
		wrapper.find('InputText[type="text"]').simulate('change', {target: {id: 'name', value: 'test'}});
		expect(wrapper.state('name')).toEqual('test');
	});

	test('email entry', () => {
		wrapper.find('InputText[type="text"]').simulate('change', {target: {id: 'email', value: 'test@test.com'}});
		expect(wrapper.state('email')).toEqual('test@test.com');
	});

	test('password entry', () => {
		wrapper.find('InputText[type="text"]').simulate('change', {target: {id: 'password', value: 'password'}});
		expect(wrapper.state('password')).toEqual('password');
	});

	test('password confirmation entry', () => {
		wrapper.find('InputText[type="text"]').simulate('change', {target: {id: 'password2', value: 'password'}});
		expect(wrapper.state('password2')).toEqual('password');
	});

	test('successful registration', () => {
		wrapper.find('InputText[type="text"]').simulate('change', {target: {id: 'name', value: 'test'}});
		wrapper.find('InputText[type="text"]').simulate('change', {target: {id: 'email', value: 'email@email.com'}});
		wrapper.find('InputText[type="text"]').simulate('change', {target: {id: 'password', value: 'password'}});
		wrapper.find('InputText[type="text"]').simulate('change', {target: {id: 'password2', value: 'password'}});
		wrapper.find('form').simulate('submit', {preventDefault() {}});
		expect(wrapper.instance().props.registerUser).toHaveBeenCalled()
	});

	test('redirect to dashboard if authenticated', () => {
		const isAuth = {
			isAuthenticated: true,
			user: {},
			loading: false,
		}
		const historyMock = { push: jest.fn() };
		wrapper = shallow(<Register registerUser = {params.registerUser} auth = {isAuth} errors = {params.errors} history = {historyMock} />);
		expect(historyMock.push.mock.calls[0]).toEqual(['/dashboard']);
	});

	test('errors', () => {
		const fakeErr = {
			errors: [{
				'param': 'name',
				'msg' : 'Invalid name'
			}]
		}
		wrapper.setProps({ errors: fakeErr });
		expect(wrapper.state('errors')).toEqual(fakeErr);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
});
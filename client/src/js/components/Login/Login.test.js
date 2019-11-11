import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login } from './Login';
import { loginUser } from "../../actions/index";

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/index');

describe('Login', () => {
	const params = {
		loginUser: loginUser,
		auth: {
			isAuthenticated: false,
			user: {},
			loading: false
		},
		errors: {}
	}
	test('renders', () => {
		const component = renderer.create(
			<MemoryRouter>
				<Login loginUser = {params.loginUser} auth = {params.auth} errors = {params.errors} />
			</MemoryRouter>
		).toJSON();
		
		expect(component).toMatchSnapshot();
	});

	test('email entry', () => {
		let wrapper = shallow(<Login loginUser = {params.loginUser} auth = {params.auth} errors = {params.errors} />);
		wrapper.find('input[type="email"]').simulate('change', {target: {id: 'email', value: 'test@test.com'}});
		expect(wrapper.state('email')).toEqual('test@test.com');
	});

	test('password entry', () => {
		let wrapper = shallow(<Login loginUser = {params.loginUser} auth = {params.auth} errors = {params.errors} />);
		wrapper.find('input[type="password"]').simulate('change', {target: {id: 'password', value: 'password'}});
		expect(wrapper.state('password')).toEqual('password');
	});
});
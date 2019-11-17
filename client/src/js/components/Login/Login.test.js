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
		wrapper.find('InputText[type="email"]').simulate('change', {target: {id: 'email', value: 'test@test.com'}});
		expect(wrapper.state('email')).toEqual('test@test.com');
	});

	test('password entry', () => {
		let wrapper = shallow(<Login loginUser = {params.loginUser} auth = {params.auth} errors = {params.errors} />);
		wrapper.find('InputText[type="password"]').simulate('change', {target: {id: 'password', value: 'password'}});
		expect(wrapper.state('password')).toEqual('password');
	});

	test('successful login', () => {
		let wrapper = shallow(<Login loginUser = {params.loginUser} auth = {params.auth} errors = {params.errors} />);
		wrapper.find('InputText[type="email"]').simulate('change', {target: {id: 'email', value: 'test@test.com'}});
		wrapper.find('InputText[type="password"]').simulate('change', {target: {id: 'password', value: 'password'}});
		wrapper.find('form').simulate('submit', {preventDefault() {}});
		expect(wrapper.instance().props.loginUser).toHaveBeenCalled()
	});

	test('redirect to dashboard if authenticated', () => {
		const isAuth = {
			isAuthenticated: true,
			user: {},
			loading: false,
		}
		const historyMock = { push: jest.fn() };
		let wrapper = shallow(<Login loginUser = {params.loginUser} auth = {isAuth} errors = {params.errors} history = {historyMock}/>);
		wrapper.setProps({ auth: { isAuthenticated: true } });
		expect(historyMock.push.mock.calls[0]).toEqual(['/dashboard']);
	});

	test('errors', () => {
		const fakeErr = {
			errors: [{
				'param': 'email',
				'msg' : 'Invalid email'
			}]
		}
		let wrapper = shallow(<Login loginUser = {params.loginUser} auth = {params.auth} errors = {params.errors} />);
		wrapper.setProps({ errors: fakeErr });
		// console.log(wrapper.instance().props.errors.errors.find(x => x.param === 'email'));
		expect(wrapper.state('errors')).toEqual(fakeErr);
	});
});
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Dashboard } from './Dashboard';
import { logoutUser } from "../../actions/users";

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/users');

describe('Dashboard', () => {
	const params = {
		logoutUser : logoutUser,
		auth: {
			isAuthenticated: true,
			user: {},
			loading: false,
		}
	}

	test('renders', () => {
		const component = renderer.create(
			<MemoryRouter>
				<Dashboard logoutUser = {params.logoutUser} auth = {params.auth} />
			</MemoryRouter>
		).toJSON();
		
		expect(component).toMatchSnapshot();
	});

	test('redirect to login', () => {
		const notAuth = {
			isAuthenticated: false,
			user: {},
			loading: false,
		}
		const historyMock = { push: jest.fn() };
		let wrapper = shallow(<Dashboard logoutUser = {params.logoutUser} auth = { notAuth } history = {historyMock} />);
		wrapper.setProps({ isAuthenticated: false });
		expect(historyMock.push.mock.calls[0]).toEqual(['/login']);
	});

	test('logout', () => {
		let wrapper = shallow(<Dashboard logoutUser = {params.logoutUser} auth = {params.auth} />);
		wrapper.find('button').simulate('click', {preventDefault() {}});
		expect(wrapper.instance().props.logoutUser).toHaveBeenCalled();
	});
});
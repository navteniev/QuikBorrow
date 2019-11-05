import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Register from './Register';

Enzyme.configure({ adapter: new Adapter() });

describe('Register', () => {
	test('renders', () => {
		const component = renderer.create(
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		).toJSON();
		
		expect(component).toMatchSnapshot();
	});
	
	/* test('username entry', () => {
		const wrapper = shallow(<Register />);
		wrapper.find('input[type="text"]').simulate('change', {target: {name: 'name', value: 'test'}});
		expect(wrapper.state('name')).toEqual('test');
	});
	*/
});
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

Enzyme.configure({ adapter: new Adapter() });

describe('Navbar', () => {
    it('should render a navbar with SignedIn links', () => {
        const component = renderer.create(
			<MemoryRouter>
				<Navbar auth = {true} />
			</MemoryRouter>);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
    });

    it('should render a navbar with SignedOut links', () => {
        const component = renderer.create(
			<MemoryRouter>
				<Navbar auth = {false} />
			</MemoryRouter>);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
	
	it('has link to root component', () => {
		const wrapper = shallow(<Navbar auth = {false} />);
		expect(wrapper.find('.brand-logo').props().to).toBe('/');
	})
});
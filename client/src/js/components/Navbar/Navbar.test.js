import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

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
});
import React from 'react';
import renderer from 'react-test-renderer';
import Profile from './Profile';



describe('Profile', () => {
	it('should render User Signed In Profile', () => {
		const component = renderer.create(
			<MemoryRouter>
				<Profile/>
			</MemoryRouter>	);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
import React from 'react';
import renderer from 'react-test-renderer';
import Profile from './Profile';



describe('Profile', () => {
	it('should render a mock Profile', () => {
		const component = renderer.create(<Profile/>);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
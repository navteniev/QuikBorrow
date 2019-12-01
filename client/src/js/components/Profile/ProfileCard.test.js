import React from 'react';
import renderer from 'react-test-renderer';
import ProfileCard from './ProfileCard';


describe('ProfileCard', () => {
	it('should render a ProfileCard', () => {
		let component = renderer.create(
        <ProfileCard
        products ={[]}
        wishlist = {[]}
        />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

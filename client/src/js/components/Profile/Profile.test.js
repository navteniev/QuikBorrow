import React from 'react';
import renderer from 'react-test-renderer';
import {UserProfile} from './Profile';


describe('Profile', () => {
	it('should render Profile', () => {
        const user ={}
        const match = { params: { profileId: 'foo' } }
		let component = renderer.create(
        <UserProfile 
        getUserProfile={() => {}}
        fetchProducts={() => {}}
        match = {match}
        user = {user}
        products = {[]}
        />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

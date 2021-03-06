import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProfileCard } from './ProfileCard';

Enzyme.configure({ adapter: new Adapter() });

describe('ProfileCard', () => {

    let profile = mount(
        <ProfileCard
        products ={[]}
        wishlist = {[]}
        transactions = {[]}
        />);
    
    it('render list', () =>{
        expect(profile.find('#products-list').hostNodes()).toHaveLength(1);
        expect(profile.find('#wish-list').hostNodes()).toHaveLength(1);
	});

	test('render ProfileCard', () => {
		let component = renderer.create(
        <ProfileCard
        products ={[]}
        wishlist = {[]}
        transactions = {[]}
        />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

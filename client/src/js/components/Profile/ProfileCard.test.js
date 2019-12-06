import React from 'react';
import renderer from 'react-test-renderer';
import ProfileCard from './ProfileCard';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/index');

describe('ProfileCard', () => {
    const products = {}
    const wishlist = {}

    let profile = mount(
        <ProfileCard
        products ={[products]}
        wishlist = {[wishlist]}
        />);
    

    it('render list', () =>{
        expect(profile.find('#products-list').children()).toHaveLength(1);
        expect(profile.find('#wish-list').children()).toHaveLength(1);
	});

	test('render ProfileCard', () => {
		let component = renderer.create(
        <ProfileCard
        products ={[]}
        wishlist = {[]}
        />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

import React from 'react';
import renderer from 'react-test-renderer';
import ProfileCard from './ProfileCard';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { isNumber } from 'util';


Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/index');

describe('ProfileCard', () => {

    const profile = mount(
        <ProfileCard
        products ={[]}
        wishlist = {[]}
        />);

    it('render list', () =>{
        expect(profile.find('#products-list').children()).toEqual(expect.anything());
        expect(profile.find('#wish-list').children()).toEqual(expect.anything());
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

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Search } from './Search';
import { searchProducts } from "../../actions/index";

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/index');

describe('Search', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Search searchProducts = {searchProducts} />)
	});

	test('query entry', () => {
		wrapper.find('#query').simulate('change', {target: {id: 'query', value: 'chair'}});
		expect(wrapper.state('query')).toEqual('chair');
	});

	test('submit query', () => {
		wrapper.find('form').simulate('submit', {preventDefault() {}});
		expect(wrapper.instance().props.searchProducts).toHaveBeenCalled();
	});
})
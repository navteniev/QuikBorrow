import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Search } from './Search';
import { searchProducts } from "../../actions/products";

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/products');

describe('Search', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Search searchProducts = {searchProducts} />)
	});

	test('query entry', () => {
		wrapper.find('#query').simulate('change', {target: {id: 'query', value: 'chair'}});
		expect(wrapper.state('query')).toEqual('chair');
	});

	test('invalid query entry', () => {
		wrapper.find('#query').simulate('change', {target: {id: 'query', value: 'asdfghjklasdfghjklasdfghjklasdfghjklasdfghjkl'}});
		wrapper.find('form').simulate('submit', {preventDefault() {}});
		expect(wrapper.state('error')).toEqual('Too large of an input');
	});

	test('submit query', () => {
		wrapper.find('form').simulate('submit', {preventDefault() {}});
		expect(wrapper.instance().props.searchProducts).toHaveBeenCalled();
	});

	test('button click', () => {
		const reset = jest.fn()
		wrapper = shallow(<Search searchProducts = {searchProducts} resetPage={reset} />)
		wrapper.find('#search').simulate('click');
		expect(wrapper.instance().props.searchProducts).toHaveBeenCalled();
		expect(wrapper.instance().props.resetPage).toHaveBeenCalled();
	});
})
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Comment } from './Comment';
import { createComment } from '../../actions/comments';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/comments');

describe('Comment', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Comment createComment = {createComment} />);
	});

	test('text entry', () => {
		wrapper.find('#body').simulate('change', {target: {id: 'body', value: 'Hello world'}});
		expect(wrapper.state('body')).toEqual('Hello world');
	});

	test('submit comment', () => {
		window.location.reload = jest.fn();
		wrapper.find('form').simulate('submit', {preventDefault() {}});
		expect(wrapper.instance().props.createComment).toHaveBeenCalled();
	});

	test.skip('rating change', () => {
		const event = {
			preventDefault() {},
			target: { id: 'rating', value: 4 }
		};
		wrapper.find('#rating').simulate('change', event);
		expect(wrapper.state('rating')).toEqual(4);
	});

	afterEach(() => {
		localStorage.clear();
	})
});
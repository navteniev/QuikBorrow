import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Comment } from './Comment';
import { createComment, getComments } from '../../actions/comments';
import { updateRating } from '../../actions/products';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/comments');
jest.mock('../../actions/products');

describe('Comment', () => {
	const params = {
		auth: {
			isAuthenticated: true,
			user: {
				name: 'Me',
				id: '123'
			},
			loading: false
		},
	}
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Comment 
			createComment = {createComment}
			getComments = { getComments }
			updateRating = { updateRating }
			auth = {params.auth}
			comments = {[
				{
					user: 'a',
					id: 'b',
					product: 'c',
					text: 'd',
					rating: 5,
				},
				{
					user: 'd',
					id: 'e',
					product: 'f',
					text: 'g',
					rating: 1,
				},
			]}
		/>);
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

	test('error when not logged in', () => {
		const notAuth = {
			isAuthenticated: false,
			user: {},
			loading: false
		}
		wrapper.setProps({ auth: notAuth });
		wrapper.find('form').simulate('submit', {preventDefault() {}});
		expect(wrapper.state('error')).toEqual('You must be logged in to comment.');
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
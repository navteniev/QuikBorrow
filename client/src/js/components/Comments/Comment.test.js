import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Comment } from './Comment';
import { createComment } from '../../actions/comments';

require('jest-localstorage-mock');

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/comments');

describe('Comment', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Comment createComment = {createComment} />);
		localStorage.setItem("jwtToken", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY2EyYzkzYTI3NTBkMGRiODE0NDI3ZCIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNTc1OTQwNjM4LCJleHAiOjE2MDc0OTc1NjR9.pVtp23VMGIpxZmv8VX15DvG53cWHKjcDVgFDpSt8Yoo");
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

	/*test('rating change', () => {
		const event = {
			preventDefault() {},
			target: { id: 'rating', value: 4 }
		};
		wrapper.find('#rating').simulate('change', event);
		expect(wrapper.state('rating')).toEqual(4);
	});*/

	afterEach(() => {
		localStorage.clear();
	})
});
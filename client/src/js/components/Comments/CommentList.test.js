import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CommentList } from './CommentList';
import { getComments } from '../../actions/comments';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/comments');

describe('CommentList', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<CommentList getComments = {getComments} comments = {[]} />);
	});

	test('render all comments', () => {
		const arr = [
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
		]
		wrapper.setProps({ comments: arr });
		expect(wrapper.instance().props.getComments).toHaveBeenCalled();
	});
});
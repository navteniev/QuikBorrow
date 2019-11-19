import React from 'react';
import renderer from 'react-test-renderer';
import AddItemModal from './AddItemModal';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('AddItemModal', () => {
	test('renders', () => {
        const wrapper = mount(<AddItemModal open={true} onClose={jest.fn()} />)
        
		expect(wrapper.html()).toMatchSnapshot();
	});
});
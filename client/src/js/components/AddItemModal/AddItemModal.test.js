import React from 'react';
import {act} from 'react-dom/test-utils'
import AddItemModal from './AddItemModal';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('AddItemModal', () => {
	it('renders', () => {
        const wrapper = mount(<AddItemModal open={true} onClose={jest.fn()} />)
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('shows added files', async () => {
		const wrapper = mount(<AddItemModal open={true} onClose={jest.fn()} />)
		const imageDropzone = wrapper.find('div[data-testid="image-dropzone-container"]')
		const images = [ new File([], 'image1.jpg'), new File([], 'aaaa.png') ]
		act(() => {
			imageDropzone.prop('onDrop')(images)
		})
		wrapper.update()
		for (const image of images) {
			expect(wrapper.find(`div[data-testid="added-image-${image.name}"]`)).toHaveLength(1)
		}
	})

	it('removes added file', async () => {
		const wrapper = mount(<AddItemModal open={true} onClose={jest.fn()} />)
		const imageDropzone = wrapper.find('div[data-testid="image-dropzone-container"]')
		const images = [ new File([], 'image1.jpg'), new File([], 'aaaa.png'), new File([], 'aedgtrhrf.jpg') ]
		act(() => {
			imageDropzone.prop('onDrop')(images)
		})
		wrapper.update()
		wrapper.find(`*[data-testid="delete-image-${images[0].name}"]`).hostNodes().simulate('click')
		wrapper.find(`*[data-testid="delete-image-${images[2].name}"]`).hostNodes().simulate('click')
		expect(wrapper.find(`*[data-testid^="delete-image"]`).hostNodes()).toHaveLength(1)
		expect(wrapper.find(`*[data-testid="delete-image-${images[1].name}"]`).hostNodes()).toHaveLength(1)
	})
});
import React from 'react';
import {act} from 'react-dom/test-utils'
import AddItemModal from './AddItemModal';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('AddItemModal', () => {
	let wrapper
	beforeEach(function() {
		wrapper = mount(<AddItemModal open={true} onClose={jest.fn()} />)
	});
	
	it('renders', () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('shows added files', async () => {
		const imageDropzone = wrapper.find('div[data-testid="image-dropzone-container"]')
		const images = [ new File([], 'image1.jpg'), new File([], 'aaaa.png') ]
		act(() => {
			imageDropzone.prop('onDrop')(images)
		})
		wrapper.update()
		expect(wrapper.find(`div[data-testid^="added-image"]`)).toHaveLength(images.length);
		for (const image of images) {
			expect(wrapper.find(`div[data-testid="added-image-${image.name}"]`)).toHaveLength(1)
		}
	});

	it('removes added file', async () => {
		const imageDropzone = wrapper.find('div[data-testid="image-dropzone-container"]')
		const images = [ new File([], 'image1.jpg'), new File([], 'aaaa.png'), new File([], 'aedgtrhrf.jpg') ]
		act(() => {
			imageDropzone.prop('onDrop')(images)
		})
		wrapper.update()
		const findImageNode = imageName => wrapper.find(`*[data-testid="delete-image-${imageName}"]`).hostNodes()
		findImageNode(images[0].name).simulate('click')
		findImageNode(images[2].name).simulate('click')
		expect(findImageNode(images[0].name)).toHaveLength(0)
		expect(findImageNode(images[1].name)).toHaveLength(1)
		expect(findImageNode(images[2].name)).toHaveLength(0)
	});
});
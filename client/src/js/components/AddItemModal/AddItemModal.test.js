import React from 'react';
import {act} from 'react-dom/test-utils'
import AddItemModal from './AddItemModal';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactRouter from 'react-router-dom'
import { Provider } from 'react-redux'
import axios from 'axios'
import configureMockStore from 'redux-mock-store'
Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore()

jest.mock('axios')

describe('AddItemModal', () => {
	const submitSelector = '*[data-testid="submit-button"]'
	const nameInputSelector = '*[data-testid="input-name"]'
	const descInputSelector = '*[data-testid="input-description"]'
	const formSelector = '#form-add-item'
	const productButtonSelector = '*[data-testid="product-page-button"]'
	const flushPromises = () => new Promise(setImmediate);

	/** @type {Enzyme.ReactWrapper} */
	let wrapper
	
	/** @type {import('redux-mock-store').MockStoreEnhanced} */
	let store

	let localStorageSpy = jest.spyOn(Storage.prototype, 'getItem')
	localStorageSpy.mockReturnValue(1)
	
	/**
	 * @param {boolean} isAuthenticated - Whether the user is authenticated
	 */
	const recreateWrapper = (isAuthenticated = false) => {
		store = mockStore({
			auth: {
				isAuthenticated,
				user: {
					id: 123
				}
			}
		})
		wrapper = mount(
			<Provider store={store}>
				<ReactRouter.MemoryRouter>
					<AddItemModal open={true} onClose={jest.fn()} />
				</ReactRouter.MemoryRouter>
			</Provider>
		)
	}

	beforeEach(() => {
		recreateWrapper()
	})
	afterAll(() => {
		localStorageSpy.mockRestore()
	})
	it('renders', () => {
		expect(wrapper.html()).toMatchSnapshot();
	})
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
	it('removes added file', () => {
		const imageDropzone = wrapper.find('div[data-testid="image-dropzone-container"]')
		const images = [ new File([], 'image1.jpg'), new File([], 'aaaa.png'), new File([], 'aedgtrhrf.jpg') ]
		act(() => {
			imageDropzone.prop('onDrop')(images)
		})
		wrapper.update()
		const findImageNode = image => wrapper.find(`*[data-testid="delete-image-${image.name}"]`).hostNodes()
		findImageNode(images[0]).simulate('click')
		findImageNode(images[2]).simulate('click')
		expect(findImageNode(images[0])).toHaveLength(0)
		expect(findImageNode(images[1])).toHaveLength(1)
		expect(findImageNode(images[2])).toHaveLength(0)
	});
	it('sets the submit button disabled prop appropriately', function() {
		const nameInput = wrapper.find(nameInputSelector)
		const descriptionInput = wrapper.find(descInputSelector)
		const getSubmitButton = () => wrapper.find(submitSelector).hostNodes()

		expect(getSubmitButton().prop('disabled')).toEqual(true)
		nameInput.simulate('change', {target: {value: 123}})
		expect(getSubmitButton().prop('disabled')).toEqual(true)
		descriptionInput.simulate('change', {target: {value: 123}})
		expect(getSubmitButton().prop('disabled')).toEqual(false)
	})
	it('shows the product page button on submit success', async function() {
		recreateWrapper(true)
		const _id = '32qr5etw4gr'
		axios.post.mockResolvedValueOnce({data: {_id}})
		wrapper.find(formSelector).simulate('submit')
		await act(async () => await flushPromises())
		wrapper.update()
		const productButton = wrapper.find(productButtonSelector).hostNodes()
		expect(productButton).toHaveLength(1)
	})
	it.todo('clears all files after request success')
});

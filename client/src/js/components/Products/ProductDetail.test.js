import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProductDetail } from './ProductDetail';
import { fetchProduct } from "../../actions/index";

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/index');

describe('Product Detail', () => {
	const param = {
		product: {
			name: 'test',
			description: 'desc',
			_id: '0',
			availability: false,
			user: 'user'
		},
		match: {
			params: {
				productId: 0
			}
		}
	}

	test('renders', () => {
		const component = renderer.create(
			<MemoryRouter>
				<ProductDetail product = {param.product} match = {param.match} fetchProduct = {fetchProduct} />
			</MemoryRouter>
		).toJSON();
		
		expect(component).toMatchSnapshot();
	});
});
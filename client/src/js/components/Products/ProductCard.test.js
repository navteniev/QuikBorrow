import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
	it('should render a ProductCard', () => {
		const component = renderer.create(
			<MemoryRouter>
				<ProductCard />
			</MemoryRouter>);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
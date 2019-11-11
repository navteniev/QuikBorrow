import React from 'react';
import renderer from 'react-test-renderer';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
	it('should render a ProductCard', () => {
		const component = renderer.create(<ProductCard />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
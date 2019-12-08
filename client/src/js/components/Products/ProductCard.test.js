import React from 'react';
import renderer from 'react-test-renderer';
import ProductCard from './ProductCard';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
const createStore = configureMockStore()

jest.mock('react-router-dom', () => ({
	useHistory: () => ({
	  push: jest.fn(),
	}),
  }));

describe('ProductCard', () => {
	it('should render a ProductCard', () => {
		const store = createStore({
			auth: {
				user: {}
			}
		})
		const component = renderer.create(
			<Provider store={store}>
				<ProductCard />
			</Provider>);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
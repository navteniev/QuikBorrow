import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProductDetail } from './ProductDetail';
import { fetchProduct } from "../../actions/index";

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/index');

jest.mock("react-redux", () => {
  return {
    connect: (mapStateToProps, mapDispatchToProps) => (
      ReactComponent
    ) => ReactComponent
  };
});

jest.mock('../Comments/CommentList', () => ()=> <div id="mockContainer">
   mockContainer
</div>);

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
		const auth = {
			user: {}
		}
		const component = renderer.create(
			<ProductDetail product = {param.product} match = {param.match} fetchProduct = {fetchProduct} auth={auth} />
		).toJSON();
		
		expect(component).toMatchSnapshot();
	});
});
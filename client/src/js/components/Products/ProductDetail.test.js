import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProductDetail } from './ProductDetail';
import { fetchProduct } from "../../actions/products";

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../actions/products');

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
			<ProductDetail
				product={param.product}
				match={param.match}
				fetchProduct={fetchProduct}
				auth={auth}
				transactionsData={[]} />
		).toJSON();
		
		expect(component).toMatchSnapshot();
	});

	test('it requests the fetch on button press', () => {
		const match = {
			params: {
				productId: 1
			}
		}
		const product = {}
		const auth = {user: {}}
		const requestBorrowProductFetch = jest.fn()
		const wrapper = shallow(
			<ProductDetail
				match={match}
				product={product}
				auth={auth}
				requestBorrowProductFetch={requestBorrowProductFetch}
				transactionsData={[]}
				fetchingTransactions={false}
				fetchProduct={jest.fn()} />
		)
		wrapper.find('*[data-testid="request-btn"]').simulate('click')
		expect(requestBorrowProductFetch).toHaveBeenCalled()
	});

	test('sets state fetchingTransactions correctly for not logged in user', () => {
		const match = {
			params: {
				productId: 1
			}
		}
		const requestBorrowProductFetch = jest.fn()
		const wrapper = shallow(
			<ProductDetail
				match={match}
				product={{}}
				auth={{user: {id: 1}}}
				requestBorrowProductFetch={requestBorrowProductFetch}
				fetchingTransactions={true}
				transactionsData={[]}
				fetchTransactions={jest.fn()}
				fetchProduct={jest.fn()} />
		)
		expect(wrapper.state('fetchingTransactions')).toEqual(true)
		wrapper.setProps({ fetchingTransactions: false })
		expect(wrapper.state('fetchingTransactions')).toEqual(false)
	});

	test('sets state fetchingTransactions correctly for logged in user', () => {
		const match = {
			params: {
				productId: 1
			}
		}
		const requestBorrowProductFetch = jest.fn()
		const wrapper = shallow(
			<ProductDetail
				match={match}
				product={{}}
				auth={{user: {}}}
				requestBorrowProductFetch={requestBorrowProductFetch}
				fetchingTransactions={true}
				transactionsData={[]}
				fetchTransactions={jest.fn()}
				fetchProduct={jest.fn()} />
		)
		expect(wrapper.state('fetchingTransactions')).toEqual(false)
	});
});
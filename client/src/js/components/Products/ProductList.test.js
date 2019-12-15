import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProductList } from './ProductList';
import { fetchProducts } from '../../actions/products';

jest.mock('../../actions/products');

jest.mock("react-redux", () => {
  return {
    connect: (mapStateToProps, mapDispatchToProps) => (
      ReactComponent
    ) => ReactComponent
  };
});

Enzyme.configure({ adapter: new Adapter() });

describe('ProductList', () =>{
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ProductList fetchProducts={fetchProducts} products={[]} />);
    });

    test('renders', () => {
        const component = renderer.create(
            <MemoryRouter>
                <ProductList fetchProducts={fetchProducts} />
            </MemoryRouter>
        ).toJSON();
        
        expect(component).toMatchSnapshot();
    });

    it('should call nextPage', () => {
        wrapper = shallow(<ProductList products={[]} fetchProducts={fetchProducts} />);
        const spy = jest.spyOn(ProductList.prototype, 'nextPage');
        wrapper.find('#next').simulate('click');
        wrapper.update();
        expect(spy).toHaveBeenCalled();
    });

    it('should call prevPage', () => {
        wrapper = shallow(<ProductList products={[]} fetchProducts={fetchProducts} />);
        const spy = jest.spyOn(ProductList.prototype, 'prevPage');
        wrapper.find('#prev').simulate('click');
        wrapper.update();
        expect(spy).toHaveBeenCalled();
    })

})
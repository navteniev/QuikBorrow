import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import ProductList from './ProductList';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ProductList', () =>{
    let store = mockStore({});
    let component = renderer.create(
        <Provider store={store}>
            <ProductList />
        </Provider>
    )

    it('should render ProductList with given Redux state', () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

})
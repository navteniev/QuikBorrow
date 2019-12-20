import React from 'react';
import renderer from 'react-test-renderer';
import Profile from './Profile';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const createStore = configureMockStore()


jest.mock('../../actions/products', () => ({
    getUserProfile: () => ({type:1}), fetchProducts: () => ({type:1}), fetchTransactions: () => ({type:1})
}));
jest.mock('../../actions/users', () => ({
    getUserProfile: () => ({type:1}), fetchProducts: () => ({type:1}), fetchTransactions: () => ({type:1})
}));


describe('Profile', () => {
    const match = { params: { profileId: 'foo' } }
    
    
    test('render when user match', () => {
        const store = createStore({
            user: {
                _id: '111',
            },
            products: [],
            auth: {user: {id: '001'} },
            transactions:{data: [] }
        })
        let component = renderer.create(
            <Provider store={store}>
            <Profile 
            match = {match}
            />
        </Provider>);
        let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
    });

    test('render when user does not exist', () => {
        const store = createStore({
            user: 0,
            products: [],
            auth: {user: {id: '001'} },
            transactions:{data: [] }
        })
        let component = renderer.create(
            <Provider store={store}>
            <Profile 
            match = {match}
            />
        </Provider>);
       let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('render mylist', () => {
        const store = createStore({
            user: {
                _id: '111',
            },
            products:[
                {user:'213421', item:'chair'},
                {user:'341234', item:'table'}
            ],
            auth: {user: {id: '001'} },
            transactions:{data: [] }
        })
        let component = renderer.create(
            <Provider store={store}>
            <Profile 
            match = {match}
            />
        </Provider>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});

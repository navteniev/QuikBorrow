import React from 'react';
import renderer from 'react-test-renderer';
import { UserProfile } from './Profile';

describe('Profile', () => {
    const user = {_id:'111'}
    const match = { params: { profileId: 'foo' } }
    
    test('render when user match', () => {
        let component = renderer.create(
            <UserProfile 
            getUserProfile={() => {}}
            fetchProducts={() => {}}
            match = {match}
            user = {user}
            products = {[]}
            />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
    });

    test('render when user does not exist', () => {
        let component = renderer.create(
            <UserProfile 
            getUserProfile={() => {}}
            fetchProducts={() => {}}
            match = {match}
            user = {0}
            products = {[]}
            />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
    });

    test('render mylist', () => {
        const products = [
            {user:'213421', item:'chair'},
            {user:'341234', item:'table'}
        ];
        let component = renderer.create(
            <UserProfile 
            getUserProfile={() => {}}
            fetchProducts={() => {}}
            match = {match}
            user = {user}
            products = {products}
            />);
        let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
    })

});

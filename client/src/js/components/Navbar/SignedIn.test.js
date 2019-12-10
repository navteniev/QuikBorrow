import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from "react-router-dom";
import {SignedIn} from './SignedIn';

Enzyme.configure({ adapter: new Adapter() });

describe('<SignedIn />', () => {
    const userId = '5de9ae93f3321a2d53b485ab';

    /** @type {Enzyme.ReactWrapper} */
    let wrapper

    let element

    beforeEach(() => {  
        wrapper = mount(<MemoryRouter><SignedIn logoutUser={jest.fn()} id={userId} /></MemoryRouter>);
        element = selector => wrapper.find(selector).hostNodes();
    })

    it('should render', () => {
		expect(wrapper.html()).toMatchSnapshot();
    });

    it('should have a products link', () => {
        expect(element('#products')).toHaveLength(1);
    });

    it('should have a profile link', () => {
        expect(element('#profile')).toHaveLength(1);
    });
});
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from "react-router-dom";
import SignedOut from './SignedOut';

Enzyme.configure({ adapter: new Adapter() });

describe('<SignedOut />', () => {
    /** @type {Enzyme.ReactWrapper} */
    let wrapper

    let element

    beforeEach(() => {  
        wrapper = shallow(<SignedOut />);
        element = selector => wrapper.find(selector);
    });

    it('should render', () => {
		  const component = renderer.create(
        <MemoryRouter>
          <SignedOut />
        </MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have a login link', () => {
      expect(element('#login')).toHaveLength(1);
    });

    it('should have a register link', () => {
      expect(element('#register')).toHaveLength(1);
    });
    
});
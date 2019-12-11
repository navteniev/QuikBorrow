import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import { SignedIn } from './SignedIn';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'


Enzyme.configure({ adapter: new Adapter() });
const createStore = configureStore()

describe('SignedIn', () => {

  	// it('Test click event', () => {
	// 	const mockCallBack = jest.fn();
	// 	const store = createStore({ auth: { user: {} } })

    // 	const tree = mount(
	// 		<Provider store={store}>
	// 		<SignedIn onClick={mockCallBack}/>
	// 		</Provider>
	// 		)
	// 	tree.simulate('click');
    // 	expect(mockCallBack.mock.calls.length).toEqual(1);
	//   });
    it('render SignedIn', () => {
        const store = createStore({ auth: { user: {} } })

        const component = renderer.create(
                <Provider store={store}>
                    <MemoryRouter>
                        <SignedIn />
                    </MemoryRouter>
                </Provider>
			);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
        });

});

import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import Homepage from './Homepage';
const mockStore = configureMockStore()

describe('Homepage', () => {
	test('renders', () => {
		const store = mockStore({
			auth: {
				isAuthenticated: false
			}
		})
		const component = renderer.create(
			<Provider store={store}>
				<MemoryRouter>
					<Homepage />
				</MemoryRouter>
			</Provider>
		).toJSON();
		
		expect(component).toMatchSnapshot();
	});
});
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login', () => {
	test('renders', () => {
		const component = renderer.create(
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		).toJSON();
		
		expect(component).toMatchSnapshot();
	});
});
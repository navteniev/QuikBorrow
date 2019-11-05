import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Homepage from '../../js/components/Homepage/Homepage';

describe('Homepage', () => {
	test('renders', () => {
		const component = renderer.create(
			<MemoryRouter>
				<Homepage />
			</MemoryRouter>
		).toJSON();
		
		expect(component).toMatchSnapshot();
	});
});
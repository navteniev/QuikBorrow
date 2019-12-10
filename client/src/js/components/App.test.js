import React from 'react';
import ReactDOM from 'react-dom';
import FullApp, { App } from './App.js';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter, Router } from 'react-router-dom'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMemoryHistory } from 'history'
import { clearAllErrors } from '../actions/errors'
Enzyme.configure({ adapter: new Adapter() });
const createStore = configureStore()

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore({auth: {user: {}}})
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <FullApp />
      </BrowserRouter>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('clears all errors on path change', () => {
  const history = createMemoryHistory()
  const store = createStore({ auth: { user: {} } })
  store.dispatch = jest.fn()
  mount(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  )
  history.push('/someting')
  expect(store.dispatch).toHaveBeenCalledWith(clearAllErrors())
})

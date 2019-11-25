import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
const createStore = configureStore()

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore({auth: {user: {}}})
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

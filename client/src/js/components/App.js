import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from "../actions";
import "../../css/App.css";

import Homepage from "./Homepage/Homepage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import ProductList from "./Products/ProductList";
import Navbar from './Navbar/Navbar';
import ProductDetail from './Products/ProductDetail';
import Profile from "./Profile/Profile";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from '../reducers'
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <div>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/products/:productId" component={ProductDetail} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/profile" component={Profile} />
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;

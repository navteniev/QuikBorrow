import React, { Component } from "react";
import logo from "../../images/logo.svg";
import "../../css/App.css";
import { connect } from "react-redux";
import * as actions from "../actions";

import Homepage from "./Homepage/Homepage";
import Register from "./Register/Register";
import Login from "./Login/Login";

class App extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    console.log(this.props.products);
    return <div className="App">Main App</div>;
  }
}

function mapStateToProps(state) {
  return { products: state.products };
}

export default connect(
  mapStateToProps,
  actions
)(App);

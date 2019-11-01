import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import ProductCard from "./ProductCard";

class ProductList extends Component {
  componentDidMount() {
    // Fetch products when component gets mounted
    this.props.fetchProducts();
  }

  renderProducts() {
    // Returns an array of products
  }

  render() {
    return <div>{this.renderProducts()}</div>;
  }
}

function mapStateToProps(state) {
  return { products: state.products };
}

export default connect(
  mapStateToProps,
  actions
)(ProductList);

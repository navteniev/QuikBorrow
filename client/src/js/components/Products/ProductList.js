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
    return this.props.products && this.props.products.map(product => {
      return (
        <ProductCard
          key={product._id}
          name={product.name}
          user={product.user}
          description={product.description}
          availability={product.availability}
        />
      );
    });
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

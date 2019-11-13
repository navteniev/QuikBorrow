import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import styled from 'styled-components';

import ProductCard from "./ProductCard";

const Center = styled.div`
  display: flex;
  justify-content: space-evenly;
`

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
          id={product._id}
          name={product.name}
          user={product.user}
          description={product.description}
          availability={product.availability}
        />
      );
    });
  }

  render() {
    return <Center>{this.renderProducts()}</Center>;
  }
}

function mapStateToProps(state) {
  return { products: state.products };
}

export default connect(
  mapStateToProps,
  actions
)(ProductList);

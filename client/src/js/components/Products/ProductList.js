import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/products";
import styled from 'styled-components';
import ProductCard from "./ProductCard";
import Search from "../Search/Search";
import { Typography, Button, IconButton, ButtonGroup } from "@material-ui/core";
import { ArrowBack, ArrowForward } from '@material-ui/icons'

const List = styled.ul`
  margin-left: 0;
  list-style: none;
  padding-left: 0;
  li {
    list-style: none;
    list-style-type: none;
    margin: 10px 0 0 0;
    padding: 0;
    /* max-height: 150px; */
    overflow: hidden;
    text-overflow: ellipsis;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
`

const ListTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5em;
`

export class ProductList extends Component {
  static ITEMS_PER_PAGE = 5;
  state = {
    page: 0
  }
  
  componentDidMount() {
    // Fetch products when component gets mounted
    this.props.fetchProducts();
  }

  renderItem(item) {
    return  (
      <li key={item._id}>
        <ProductCard {...item} id={item._id} />
      </li>
    )
  }

  nextPage() {
    const { page } = this.state
    const { products } = this.props
    const maxPageIndex = Math.ceil((products.length / ProductList.ITEMS_PER_PAGE) - 1)
    if (page >= maxPageIndex) {
      return
    }
    this.setState({ page: page + 1 })
  }

  prevPage() {
    const { page } = this.state
    if (page <= 0) {
      return
    }
    this.setState({ page: page - 1 })
  }

  render() {
    const { products } = this.props

    // Calculate pages
    const pages = []
    let currentPage = []
    if (products) {
      products.forEach(item => {
        if (currentPage.length === ProductList.ITEMS_PER_PAGE) {
          pages.push(currentPage)
          currentPage = []
        }
        currentPage.push(item)
      })
    }
    if (currentPage.length > 0) {
      pages.push(currentPage)
    }

    const items = pages[this.state.page] && pages[this.state.page].map(this.renderItem)

    return (
      <div>
        <Search resetPage={() => { this.setState({ page: 0 }) }} />
        <ListTop>
          <Typography component='h4' variant='h4'>
            {products ? products.length : 0} Products
          </Typography>
          <ButtonGroup>
            <IconButton id="prev" onClick={e => this.prevPage()} disabled={this.state.page <= 0}>
              <ArrowBack />
            </IconButton>
            <Button disabled variant='text'>
              {this.state.page + 1}/{pages.length}
            </Button>
            <IconButton id="next" onClick={e => this.nextPage()} disabled={this.state.page === pages.length - 1}>
              <ArrowForward />
            </IconButton>
          </ButtonGroup>
        </ListTop>
        <List>
          {items}
        </List>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { products: state.products };
}

export default connect(
  mapStateToProps,
  actions
)(ProductList);

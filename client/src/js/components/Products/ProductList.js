import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import styled from 'styled-components';
import ProductCard from "./ProductCard";
import { Typography, Button, IconButton } from "@material-ui/core";
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
`

const dummyProducts = [{
  name: 'Textbook 1',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique interdum pellentesque. Quisque dolor orci, vulputate in posuere nec, rhoncus in eros. Quisque rutrum, lacus id semper tempor, ligula velit lacinia magna, at vulputate ipsum nibh et nunc. Integer ac magna eget est facilisis facilisis id vel lorem. Mauris dapibus efficitur magna eu volutpat. Ut vitae nulla rhoncus, posuere elit sed, blandit dui. Mauris id eros ornare, pellentesque mauris non, mollis arcu. Quisque a pharetra nisl. Suspendisse rhoncus leo non dui tristique egestas. Aenean scelerisque quis sem ac efficitur. Suspendisse rhoncus tortor non nunc aliquam ullamcorper. Vestibulum pharetra congue augue id sollicitudin. Nam eleifend augue a ultricies auctor. Vestibulum ut tristique ligula. ',
  image: 'https://via.placeholder.com/200',
  user: 'author name'
}]

for (let i = 0; i < 10; ++i) {
  const item = { ...dummyProducts[0] }
  dummyProducts.push(item)
}

class ProductList extends Component {
  static ITEMS_PER_PAGE = 2;
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
    products.forEach(item => {
      if (currentPage.length === ProductList.ITEMS_PER_PAGE) {
        pages.push(currentPage)
        currentPage = []
      }
      currentPage.push(item)
    })
    if (currentPage.length > 0) {
      pages.push(currentPage)
    }


    const items = pages[this.state.page] && pages[this.state.page].map(this.renderItem)
    return (
      <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <div style={{maxWidth: '1000px', width: '100%'}}>
          <ListTop>
            <Typography component='h4' variant='h4'>
              {products.length} Products
            </Typography>
            <div>
              <IconButton>
                <ArrowBack onClick={e => this.prevPage()} disabled={this.state.page <= 0} />
              </IconButton>
              <Button disabled variant='text'>
                {this.state.page + 1}/{pages.length}
              </Button>
              <IconButton>
                <ArrowForward onClick={e => this.nextPage()} disabled={this.state.page === pages.length - 1} />
              </IconButton>
            </div>
          </ListTop>
          <List>
            {items}
          </List>
        </div>
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

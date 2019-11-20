import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Button, Card, CardMedia, Container, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

const GridCard = styled(Card)`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "box1 box2"
    "box3 box2";
  margin-top: 100px;
`

const GridCardMedia = styled(CardMedia)`
    height: 300px;
    width: 300px;
    margin: 0 auto;
    grid-area: box1;
`

const GridDiv = styled.div`
    margin-left: 2%;
    margin-right: 2%;
    grid-area: box2;
`

const CommentGrid = styled.div`
  grid-area: box3;
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

export class ProductDetail extends Component {
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.productId);
    }

    // Just some initial rendering to make sure it works before styling
    renderDetail() {
        return (
            <GridCard>
                <GridCardMedia image={'https://patch.com/img/cdn/users/1142384/2013/09/raw/77d3e8242e7562885116ebff68689271.jpg'} />
                <GridDiv>
                    <SpaceBetween>
                        <Typography component='h4' variant='h4'>{this.props.product.name}</Typography>
                        <Typography>
                            <span style={{color: 'grey'}}>
                                By: {this.props.product.user}
                            </span>
                        </Typography>
                    </SpaceBetween>
                    <SpaceBetween>
                        <Typography component='h6' variant='h6'>
                            <span style={{color: '#FFD700'}}>
                                Price: {this.props.price ? this.props.price : '$100'}
                            </span>
                        </Typography>
                        <Rating name="half-rating" value={this.props.rating ? this.props.rating : '2.5'} precision={0.5} size="small" />
                    </SpaceBetween>
                    <div style={{marginTop: '30px'}}>
                        <Typography component='h5' variant='h5'>
                            <span style={{color: 'grey'}}>
                                Description
                            </span>
                        </Typography>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <Typography component='h5' variant='h5'>
                            <span style={{color: 'grey'}}>
                                Availability
                            </span>
                        </Typography>
                        <Typography>{this.props.product.availability ? 'This item is still in stock. Grab it now!' : 'Unfortunately, this item is no longer in stock. :('}</Typography>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <SpaceBetween>
                            <Button 
                                variant="contained" 
                                size="medium" 
                                color="primary" 
                                disabled={this.props.availability ? false : true}>
                                Add to Cart
                            </Button>
                            <Button 
                                variant="contained" 
                                size="medium" 
                                color="primary">
                                <AddIcon />
                                Add to Wishlist
                            </Button>
                        </SpaceBetween>
                    </div>
                </GridDiv>
                <CommentGrid>
                    Comments and Reviews section COMING SOON!!!
                </CommentGrid>
            </GridCard>
        )
    }
    
    render() {
        return (
            <Container maxWidth="lg">
                {this.renderDetail()}
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return { product : state.product }
}

export default connect(mapStateToProps, actions)(ProductDetail);
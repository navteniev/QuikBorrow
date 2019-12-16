import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/products";
import Comment from "../Comments/Comment";
import CommentList from "../Comments/CommentList";
import { Button, Card, CardMedia, Container, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import green from '@material-ui/core/colors/green'

const GridCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto 1fr 1fr;
  grid-template-areas:
    "box1 box2"
    "box3 box2";
`

const GridCardMedia = styled(CardMedia)`
  height: 300px;
  width: 300px;
  grid-area: box1;
`

const GridDiv = styled.div`
  margin-left: 2%;
  margin-right: 2%;
  grid-area: box2;
`

const CommentGrid = styled.div`
  grid-area: box3;
  margin: 10%;
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

export class ProductDetail extends Component {
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.productId)
    }

    // Just some initial rendering to make sure it works before styling
    renderDetail() {
        const { user, borrower, availability } = this.props.product
        const { user: loggedInUser } = this.props.auth

        const availabilityText = user === loggedInUser.id
        ? <span>You own this item</span>
        : !availability
          ? <span>Unavailable (currently being lended out)</span>
          : borrower === loggedInUser.id
            ? <span style={{ color: green[500] }}>You're currently borrowing this item!</span>
            : <span>Available</span>

        return (
            <GridCard>
                <GridCardMedia image={this.props.product.imagePath || 'https://patch.com/img/cdn/users/1142384/2013/09/raw/77d3e8242e7562885116ebff68689271.jpg'} />
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
                        <Rating name="half-rating" value={this.props.rating ? this.props.rating : 2.5} precision={0.5} size="small" />
                    </SpaceBetween>
                    <div style={{marginTop: '30px'}}>
                        <Typography component='h5' variant='h5'>
                            <span style={{color: 'grey'}}>
                                Description
                            </span>
                        </Typography>
                        <Typography>{this.props.product.description}</Typography>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <Typography component='h5' variant='h5'>
                            <span style={{color: 'grey'}}>
                                Availability
                            </span>
                        </Typography>
                        <Typography>{availabilityText}</Typography>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <SpaceBetween>
                            <Button 
                                variant="contained" 
                                size="medium" 
                                color="primary" 
                                disabled={this.props.product.availability ? false : true}>
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
                    <Comment prodId = {this.props.match.params.productId} />
                    <CommentList prodId = {this.props.match.params.productId} />
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
    return {
        product : state.product,
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(ProductDetail);
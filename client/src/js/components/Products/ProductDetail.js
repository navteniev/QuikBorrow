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
import { REQUEST_BORROW_PRODUCT } from '../../actions/types'

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
    state = {
        fetchingTransactions: true
    }
    
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.productId)
        if (!this.props.auth.user.id) {
            this.setState({ fetchingTransactions: false })
        } else {
            this.props.fetchTransactions(this.props.auth.user.id)
        }
        
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fetchingTransactions === true && this.props.fetchingTransactions === false) {
            this.setState({ fetchingTransactions: false })
        }
    }
    
    requestBorrow() {
        this.props.requestBorrowProductFetch(this.props.product, 'Borrowed from web')
    }

    hasPendingTransaction() {
        const { transactionsData, product, auth } = this.props
        const { _id: productId } = product
        const { id: thisUserId } = auth.user
        for (const transaction of transactionsData) {
            const { borrower, item, processed } = transaction   
            const matchesItem = item === productId
            const iAmBorrower = borrower === thisUserId
            if (matchesItem && iAmBorrower && !processed) {
                return true
            }
        }
        return false
    }

    // Just some initial rendering to make sure it works before styling
    renderDetail() {
        const { user, borrower, availability } = this.props.product
        const { user: loggedInUser } = this.props.auth

        const pendingTransaction = this.hasPendingTransaction()

        const availabilityText = user === loggedInUser.id
        ? <span>You own this item</span>
        : availability === false
          ? <span>Unavailable (currently being lended out)</span>
          : borrower === loggedInUser.id
            ? <span style={{ color: green[500] }}>You're currently borrowing this item!</span>
            : this.state.fetchingTransactions === true
                ? <span>Checking...</span>
                : pendingTransaction
                    ? <span>You already waiting for this item</span>
                    : <span>Available</span>

        return (
            <GridCard>
                <GridCardMedia image={this.props.product.imagePath || 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/No_picture_available.png/602px-No_picture_available.png'} />
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
                        <Rating name="half-rating" value={this.props.product.rating} precision={0.5} size="small" />
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
                                color="primary">
                                <AddIcon />
                                Add to Wishlist
                            </Button>
                            <Button 
                                variant="contained" 
                                size="medium" 
                                color="primary"
                                data-testid='request-btn'
                                onClick={() => this.requestBorrow()}
                                disabled={this.props.product.availability && !this.state.fetchingTransactions && !pendingTransaction ? false : true}>
                                {this.state.fetchingTransactions ? 'Checking availability...' : 'Request to Borrow'}
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
        auth: state.auth,
        error: state.errors[REQUEST_BORROW_PRODUCT.ERROR],
        fetchingTransactions: state.transactions.fetching,
        transactionsData: state.transactions.data
    }
}

export default connect(mapStateToProps, actions)(ProductDetail);
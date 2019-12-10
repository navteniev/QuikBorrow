import React from "react";
import styled from 'styled-components';
import { Card, CardMedia, CardContent, Typography, Button, Tooltip, ButtonGroup } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from "../../actions";
import axios from 'axios'
const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

// http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/
const TruncatedText = styled.p`
  overflow: hidden;
  position: relative; 
  line-height: 1.2em;
  max-height: 3.6em; 
  text-align: justify;  
  padding-right: -1em;
  padding-right: 1em;
  &::before {
    content: '...';
    position: absolute;
    right: 0;
    bottom: 0;
  }
  &::after {
    content: '';
    position: absolute;
    right: 0;
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    background: white;
  }
`

const FlexCard = styled(Card)`
  display: flex;
  height: 200px;
`

const FlexCardImage = styled(CardMedia)`
  width: 200px;
  height: auto;
  flex-shrink: 0;
`

const FlexCardContent = styled(CardContent)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ProductCard = props => {
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const { id, name, user: itemOwnerId, description, availability, image } = props;
  const history = useHistory()
  const dispatch = useDispatch()

  function apiRequest() {
    if (!isAuthenticated || itemOwnerId === user.id) {
      return;
    }
    const body = {
      borrowerId: user.id,
      lenderId: itemOwnerId,
      itemOwnerId: id
    }
    axios.post(`/api/transactions`, body)
        .then(res => {
          console.log(res)
          fetchProducts()(dispatch)
        })
        .catch(err => {
          alert('Error, check console')
          console.log(err)
        })
  }

  return (
    <FlexCard>
      <FlexCardImage image={image || 'https://patch.com/img/cdn/users/1142384/2013/09/raw/77d3e8242e7562885116ebff68689271.jpg'} title='image' />
      <FlexCardContent>
        <div>
          <SpaceBetween>
            <Typography component='h6' variant='h6'>
              {name}
            </Typography>
            <span style={{color: 'gray'}}>
              User: {itemOwnerId || 'unknown'}
            </span>
          </SpaceBetween>
          <TruncatedText>
            {description}
          </TruncatedText>
        </div>
        <SpaceBetween>
          {availability
            ? <div />
            : <Button variant='outlined'>
              Get Notified
            </Button>
          }
          <Button variant='outlined' onClick={e => history.push(`/products/${id}`)}>
              Details
            </Button>
          
        </SpaceBetween>
      </FlexCardContent>
      
    </FlexCard>
  );
};

export default ProductCard;

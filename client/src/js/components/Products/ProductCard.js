import React from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux'
import { Card, CardMedia, CardContent, Typography, Button, Tooltip, ButtonGroup } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'

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
  const { id, name, user, description, availability, imagePath, borrower } = props;
  const { user: loggedInUser } = useSelector(state => state.auth)
  const history = useHistory()
  
  const availabilityText = user === loggedInUser.id
    ? <span style={{ color: green[500], fontWeight: 600 }}>You own this item</span>
    : !availability
      ? <span style={{ color: grey[500] }}>Currently being lended out</span>
      : borrower === loggedInUser.id
        ? <span style={{ color: green[500] }}>You're currently borrowing this item</span>
        : <span>Available to borrow</span>

  return (
    <FlexCard>
      <FlexCardImage image={imagePath || 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/No_picture_available.png/602px-No_picture_available.png'} title='image' />
      <FlexCardContent>
        <div>
          <SpaceBetween>
            <Typography component='h6' variant='h6'>
              {name}
            </Typography>
            <Typography variant='body2'>
              {availabilityText}
            </Typography>
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

import React from "react";
import styled from 'styled-components';
import { Card, CardMedia, CardContent, Typography, Button, Tooltip, ButtonGroup } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

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
  const { id, name, user, description, availability, image } = props;
  const history = useHistory()

  return (
    <FlexCard>
      <FlexCardImage image={image || 'https://via.placeholder.com/200'} title='image' />
      <FlexCardContent>
        <div>
          <SpaceBetween>
            <Typography component='h6' variant='h6'>
              {name}
            </Typography>
            <span style={{color: 'gray'}}>
              User: {user || 'unknown'}
            </span>
          </SpaceBetween>
          <TruncatedText>
            {description}
          </TruncatedText>
        </div>
        <SpaceBetween>
          <ButtonGroup>
            <Button variant='outlined' onClick={e => history.push(`/products/${id}`)}>
              Details
            </Button>
            {availability
              ? null
              : <Button variant='outlined'>
                Get Notified
              </Button>
            }
          </ButtonGroup>
          {
            availability
            ? <Button color='primary' variant='contained'>
            Request
          </Button>
          : <Tooltip title='Unavailable'>
              <span>
                <Button color='primary' disabled variant='outlined'>
                  Request
                </Button>
              </span>
          </Tooltip>
          }
          
        </SpaceBetween>
      </FlexCardContent>
      
    </FlexCard>
  );
};

export default ProductCard;

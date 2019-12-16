import React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@material-ui/core';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import Rating from '@material-ui/lab/Rating';


const SideBar = styled.div`
  display: flex;
    > div:first-child {
    margin-right: 30px;
    max-width: 350px;
    }
`

const RightSide = styled.div`
  width: 3000px;
`

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const UnstyledLink = styled(Link)`
    color: inherit;
    text-decoration: inherit;
`

const ProfileCard = props => {
    const { name, age, college , products, bio, wishlist, rating, email, transactions } = props;

    const products_li = products.map((items, index) => {
      return <li key={items._id + index}>
        {items.name}
        </li>
    });
    
    const wishlist_li = wishlist.map((element, index) => {
      return <li key={element._id + index}>
        {element.item}
      </li>
    });

    const transactions_li = transactions.map(transaction => {
      return  (
        <FlexDiv>
          <UnstyledLink to={`/products/${transaction.item}`}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={transaction.item}
              />
            </ListItem>
          </UnstyledLink>
          <FlexDiv>
            <CheckIcon />
            <CancelIcon />
          </FlexDiv>
        </FlexDiv>
      );
    });

    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <SideBar>
      <Card>
        <CardMedia>
          <img src="https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg"  width="350" height="350" alt="profile_image" />
        </CardMedia>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {email} <br/>
            {college} <br/>
            {age} years old<br/>
            <br></br>
            {bio}<br/><br/>
          </Typography>
          <Button variant="outlined" color="primary">
            Edit Profile 
          </Button>   
        </CardContent>
      </Card>
    </SideBar>
    <RightSide>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h2" component="h2">
            {name} 
            <br/>
          </Typography>
          <Typography gutterBottom variant="h4" component="h2">
            Rating : {rating} 
            <br/>
            <Box component="span" m={1} borderColor="transparent">
              <Rating name="read-only" value={rating} readOnly />
            </Box>
          </Typography>
          <Typography gutterBottom variant="h4" component="h2">
            Lending List 
            <br/> 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" id='products-list'>
            {products_li}       
            <br/>
          </Typography>
            <Button variant="outlined" color="primary">
              Edit Lending List
            </Button> 
            <br/>
            <br/>
          <Typography gutterBottom variant="h4" component="h2">
            Wishlist
            <br/>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" id='wish-list'>
            {wishlist_li}
            <br/>
            <Button variant="outlined" color="primary">
              Edit Wishist
            </Button> 
          </Typography>
          <Typography gutterBottom variant="h4" component="h2">
            Transactions
            <br/>
            
          </Typography>
          <div>
            {transactions_li}
          </div>
          </CardContent>
        </Card>
      </RightSide>
    </div>
    );
  };
  
  export default ProfileCard;
  
import React from "react";
import styled from 'styled-components';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@material-ui/core';
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

const ProfileCard = props => {
    const { name, age, college , products, bio, wishlist, rating, email} = props;

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

    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <SideBar>
      <Card>
        <CardMedia>
          <img src="https://computerscience.johncabot.edu/mscaramastra/F2017/CS131-1/Scopece/CS130/SCOPECE%20FINAL/griffin%20photo/pet.jpg"  width="350" height="350" alt="profile_image" />
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
          </CardContent>
        </Card>
      </RightSide>
    </div>
    );
  };
  
  export default ProfileCard;
  
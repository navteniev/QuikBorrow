import React from "react";
import styled from 'styled-components';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';


const SideBar = styled.div`
  display: flex;
  padding: 40px 40px;
    > div:first-child {
    margin-right: 30px;
    max-width: 350px;
    }
`

const RightSide = styled.div`
  padding: 40px 40px;
  width: 3000px;
  
`
// trying to center the text in CardContent Center need to work on that 
const mCardContent = styled(CardContent)`
  align-items: center;
`

const ProfileCard = props => {
    const { name, age, college , products, bio, wishlist,rating,email} = props;

    const products_li = products.map((element) => {
      return <li key={element.id}>
        <h7>{element.item}</h7>
        <p>{element.description}</p>
        </li>
    });
    const wishlist_li = wishlist.map((element) => {
      return <li key={element.id}>
        <h7>{element.item}</h7>
      </li>
    });

    return (
      <div style={{display: 'flex', flexDirection: 'row', marginTop: '50px'}}>
      <SideBar>
      <Card>
        <CardMedia>
          <img src="https://via.placeholder.com/500"  width="350" height="350" alt="profile_image" />
        </CardMedia>
        <mCardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {email} <br/>
            {college} <br/>
            {age} years old<br/>
            <br></br>
            {bio}<br/><br/>
          </Typography>
          <Button variant="outlined" color="primary" focusVisible>
                      Edit Profile 
          </Button>   
        </mCardContent>
      </Card>
    </SideBar>
    <RightSide>
      <Card>
      <CardContent>
        <Typography gutterBottom variant="h2" component="h2">
          {name} <br/>
        </Typography>
        <Typography gutterBottom variant="h4" component="h2">
          Rating : {rating} <br></br>
        <Box component="span" m={1} borderColor="transparent">
        <Rating name="read-only" value={rating} readOnly />
      </Box>
      <br></br>
        </Typography>
        <Typography gutterBottom variant="h4" component="h2">
          Lending List
           <br/> 
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {products_li} <br/>
        </Typography>
        
        <Button variant="outlined" color="primary" focusVisible>
                      Edit LendingList
          </Button> 
          <br/>
          <br></br>
        <Typography gutterBottom variant="h4" component="h2">
          Wishlist
          <br/>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {wishlist_li} <br/>
          <Button variant="outlined" color="primary" focusVisible>
                      Edit LendingList
          </Button> 
        </Typography>
        </CardContent>
      </Card>
    </RightSide>
    </div>
    );
  };
  
  export default ProfileCard;
  
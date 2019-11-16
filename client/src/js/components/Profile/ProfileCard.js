import React from "react";
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const StyledDiv = styled.div`
  text-align:center;
  margin-top:10px;
  `

const ProfileCard = props => {
    const { name, age, college , products, bio, wishlist } = props;
    const header = (
      <img src="https://via.placeholder.com/500" alt="profile_image" />
    )

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
      <StyledDiv>
      <Card>
        <CardMedia>
          <img src="https://via.placeholder.com/500" alt="profile_image" />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {college} <br/>
            {age} years old<br/>
            {bio}<br/><br/>
          </Typography>
          <Typography gutterBottom variant="h4" component="h2">
            Lending List
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {products_li} <br/>
          </Typography>
          <Typography gutterBottom variant="h4" component="h2">
            Wishlist
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {wishlist_li} <br/>
          </Typography>
        </CardContent>   
      </Card>
    </StyledDiv>
    );
  };
  
  export default ProfileCard;
  
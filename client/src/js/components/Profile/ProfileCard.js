import React from "react";
import { Card } from "primereact/card";
import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align:center;
  margin-top: 10px;
  margin-left: 500px;
  vertical-align: middle;
  div > ul {
    display: inline-block
    list-style-type: none
  };
`

const ProfileCard = props => {
    const { name, age, college , products, bio, wishlist } = props;
    const header = (
      <img src="https://via.placeholder.com/500" alt="profile_image" />
    )

    const products_li = products.map((element) => {
      return <li key={element.id}>
        <h3>{element.item}</h3>
        <p>{element.description}</p>
        </li>
    });
    const wishlist_li = wishlist.map((element) => {
      return <li key={element.id}>
        <h3>{element.item}</h3>
      </li>
    });

    return (
      <StyledDiv>
      <Card
        header={header}
        title={name}
        subTitle={college}
        className="ui-card-shadow"
        style={{ width: "360px"}}
      >   
          <p>{age} years old</p>
          <p>{bio}</p>
          <ul>
            <h2> Lending</h2>
            {products_li}
          </ul>

          <ul>
            <h2> Wishlist </h2>
            {wishlist_li}
          </ul>
      </Card>
    </StyledDiv>
    );
  };
  
  export default ProfileCard;
  
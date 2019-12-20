import React, { Component } from "react";
import styled from 'styled-components';
import { Card, CardContent, CardMedia, Typography, Box, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import Rating from '@material-ui/lab/Rating';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { getUserProfile } from "../../actions/users";
import { connect } from "react-redux";


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

export class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _editing: false,
      tempAge: '',
      tempCollege: '',
      tempBio: '',
    }
  }
  
  toggle_Editing = async() => {
    this.setState(prevState => ({
      _editing: !prevState._editing
    }));
  }

	onChange = async (e) => {
    this.setState({[e.target.id]:e.target.value});
  }

/*
const ProfileCard = props => {
    const { name, age, college , products, bio, wishlist, rating, email, transactions } = props;

  };
*/

  onSubmit = async (e) => {
    e.preventDefault();
    const updateInfo = {
			age : this.state.tempAge,
		  college :this.state.tempCollege,
      bio : this.state.tempBio,
  }
   // this.setState(updateInfo)
    this.toggle_Editing()
    // save the updateInfo to the database
    axios.post(`/api/users/${this.props.id}/edit`, updateInfo)
  .then(() => 
    this.props.getUserProfile(this.props.id))
  .catch(console.log)

  };

  render() { 
    console.log(this.props)
    const {age, college, bio , transactions, email, products, wishlist, rating, name} = this.props

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
            {bio}<br></br>
          </Typography>
          <Button align="center" variant="outlined" color="primary" focusVisible onClick={(this.toggle_Editing)}>
                      Edit Profile 
          </Button>  
          {this.state._editing === true ? 
          <div>
            <Dialog open={this.state._editing} onClose={this.toggle_Editing} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Edit your profile and press submit to save your changes
              </DialogContentText>
                <form  onSubmit={this.onSubmit}>
                  <TextField
                    onChange={this.onChange}
                    value={this.state.tempAge || age}
                    id="tempAge"
                    label="Age"
                    type="number"
                    margin="normal"
                    fullWidth
                  />
					        <br/>
                  <TextField
                    onChange={this.onChange}
                    value={this.state.tempCollege || college}
                    id="tempCollege"
                    label="College"
                    type="text"
                    margin="normal"
                    fullWidth
                  />
					        <br/>
                  <TextField
                    onChange={this.onChange}
                    value={this.state.tempBio || bio}
                    id="tempBio"
                    type="text"
                    label="Bio"
                    margin="normal"
                    fullWidth
                  />
					        <br/>
                    <div>
                    <DialogActions>
                  <Button type="reset" onClick={this.toggle_Editing} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit"  color="primary">
                    Submit
                  </Button>
                </DialogActions>
                    </div>
              </form>
          </DialogContent>
          </Dialog>
          </div> 
          : null }
        
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
}


export default connect(undefined,{getUserProfile})(ProfileCard);
import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions/comments';
import jwt_decode from "jwt-decode";
import { Box, Button, TextField } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';

export class Comment extends React.Component {
	constructor()
	{
		super();
		this.state = {
			body: "",
			rating: 5
		};
	}
	/** 
	 *	Change state value to input based on event e
	 *	@param {event} e - input event that changes text field
	 */
	onChange = e =>
	{
		this.setState({ [e.target.id]: e.target.value });
	}

	/** 
	 *	Create a comment
	 *	@param {event} e - submit event that submits form
	 */
	onSubmit = e =>
	{
		e.preventDefault();
		const data = {
			user: jwt_decode(localStorage.jwtToken).name,
			id: jwt_decode(localStorage.jwtToken).id,
			product: this.props.prodId,
			text: this.state.body,
			rating: this.state.rating
		}
		this.props.createComment(data);	
		window.location.reload(false);	
	}
	render()
	{
		return(
			<form noValidate onSubmit={this.onSubmit}>
				<Box display="flex">
					<TextField
						onChange={this.onChange}
						value={this.state.body}
						id="body"
						type="text"
						label="Type a comment"
						fullWidth
						variant="outlined"
					/>
					<Rating 
						value={this.state.rating} 
						onChange={(event, value) => this.setState({ rating: value }) }
						id="rating"
						name="rating"
					/>
  				</Box>
  				<Button 
					variant="contained"
					color="primary" 
					id="comment"
					type="submit" 
				>
				Comment
	  			</Button>
			</form>
		);
	}
}

export default connect(
	null,
	{ createComment }
)(Comment);
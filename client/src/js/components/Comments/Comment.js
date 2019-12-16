import React from 'react';
import { connect } from 'react-redux';
import { createComment, getComments } from '../../actions/comments';
import { updateRating } from '../../actions/products';
import { Box, Button, TextField } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';

/**
 *	Comment component that allows user to create comment to save to MongoDB collection
 *	@component
 */
export class Comment extends React.Component {
	constructor()
	{
		super();
		this.state = {
			body: "",
			rating: 5,
			error: ""
		};
	}

	getRatings(comments)
	{
		let total = 0;
		comments.map(comment => {
			total+=comment.rating;
		});
		return total;
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
		if(this.props.auth.isAuthenticated)
		{
			const data = {
				user: this.props.auth.user.name,
				id: this.props.auth.user.id,
				product: this.props.prodId,
				text: this.state.body,
				rating: this.state.rating
			}
			this.props.createComment(data);
			this.props.getComments(this.props.prodId);
			const sum = this.getRatings(this.props.comments);
			const avg = (sum + this.state.rating)/(this.props.comments.length+1);
			this.props.updateRating(this.props.prodId, avg);
			window.location.reload(false);	
		}
		else
		{
			this.setState({ error: "You must be logged in to comment."})
		}
	}
	render()
	{
		return(
			<form noValidate onSubmit={this.onSubmit}>
				<span>{this.state.error}</span>
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

const mapStateToProps = state => ({
	auth: state.auth,
	comments: state.comments
});

export default connect(
	mapStateToProps,
	{ createComment, getComments, updateRating }
)(Comment);
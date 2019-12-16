import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { getComments } from '../../actions/comments';
import { Box, Typography } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Rating from '@material-ui/lab/Rating';
import dateFormat from 'dateformat';

/**
 *	CommentList component that displays all comments associated with a product
 *	@component
 */
export class CommentList extends React.Component {
	constructor()
	{
		super();
		this.state = {
			body: "",
			rating: 5
		};
	}

	componentDidMount()
	{
		this.props.getComments(this.props.prodId);
	}

	render()
	{
		const { comments } = this.props;
		return(
			<div>
				<ul style={{padding: 0}}>
					{comments.reverse().map(comment => 
						<Box p={2} key='key' pl={0}>
							<div style={{display: 'flex', alignItems: 'center' }}>
								<AccountCircleIcon fontSize="large" />
								<Link to={{ pathname: `/profile/${comment.id}`}}><Typography variant="h5">{comment.user}</Typography></Link>
							</div>
							<Rating value={comment.rating} disabled="true" />
							<Typography variant="body2">{dateFormat(comment.date, "mmmm dS, yyyy")}</Typography>
							<Typography variant="body1">{comment.text}</Typography>
						</Box>
					)}
				</ul>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return { comments: state.comments };
}

export default connect(
	mapStateToProps,
	{ getComments }
)(CommentList);
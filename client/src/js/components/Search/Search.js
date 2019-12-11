import React from 'react';
import { connect } from 'react-redux';
import { searchProducts } from '../../actions/products';
import { Box, Button, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

/**
 *	Search component that queries MongoDB database for items
 *	@component
 */
export class Search extends React.Component {
	constructor()
	{
		super();
		this.state = {
			query : "",
			error : ""
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
	 *	Call searchProducts action when submit event e is triggered unless an invalid query is provided
	 *	@param {event} e - submit event that submits form
	 */
	onSubmit = e =>
	{
		e.preventDefault();
		if(this.state.query.length > 32)
			this.setState({ error: "Too large of an input"})
		else
		{
			this.props.searchProducts(".*"+this.state.query+".*");
			this.setState({ error: ""})
		}
	}

	render() {
		return(
			<form noValidate onSubmit={this.onSubmit}>
				<Box display="flex">
					<span>{this.state.error}</span>
					<TextField
						onChange={this.onChange}
						value={this.state.query}
						id="query"
						type="text"
						label="Search Query"
						fullWidth
					/>
					<Button 
						variant="contained"
						color="primary" 
						id="search"
						type="submit" 
						style={{borderRadius: 0 }}
						onClick={() => {
							this.props.resetPage()
						}}
					>
	    			<SearchIcon />
	  				</Button>
  				</Box>
			</form>
			)
	}
}

export default connect(
	null,
	{ searchProducts }
)(Search);
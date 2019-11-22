import React from 'react';
import { connect } from 'react-redux';
import { searchProducts } from '../../actions';
import styled from 'styled-components';
import { TextField } from "@material-ui/core";

/**
 *	Search component that queries MongoDB database for items
 *	@component
 */
export class Search extends React.Component {
	constructor()
	{
		super();
		this.state = {
			query : ""
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
	 *	Call searchProducts action when submit event e is triggered
	 *	@param {event} e - submit event that submits form
	 */
	onSubmit = e =>
	{
		e.preventDefault();
		this.props.searchProducts(".*"+this.state.query+".*");
	}

	render() {
		return(
			<form noValidate onSubmit={this.onSubmit}>
				<TextField
					onChange={this.onChange}
					value={this.state.query}
					id="query"
					type="text"
					label="Search Query"
				/>
			</form>
			)
	}
}

export default connect(
	null,
	{ searchProducts }
)(Search);
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/users";
import classnames from "classnames";
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import quikLogo from '../../components/quikLogo.png';
import { REGISTER_USER } from '../../actions/types'

const LoginForm = styled.div`
	margin: 0 auto;
    max-width: 320px;
	outline: 1px solid #CCC;
	box-shadow: 5px #CCC;
    background-color: white;
	padding:1.5em;
	box-shadow: inset 0 1.5px 2px rgba(190, 190, 190, .4), 0 0 0 5px #f5f7f8;
`
const Center = styled.div`
	text-align: center;
`

/**
 *	Register component that contains UI for user registration
 *	@component
 */
export class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {}
		};
	}

	/** 
	 *	Redirect to products page if already authenticated
	 */
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
		  this.props.history.push("/products");
		}
	}

	/** 
	 *	Update errors upon receiving updated props
	 *	@param {Object} nextProps - props object that changed
	 */
	componentWillReceiveProps(nextProps) {
    	if (nextProps.errors) {
      		this.setState({
        		errors: nextProps.errors
      		});
    	}
  	}

  	/** 
	 *	Change state value to input based on event e
	 *	@param {event} e - input event that changes text field
	 */
	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	/** 
	 *	Call loginUser action when submit event e is triggered
	 *	@param {event} e - submit event that submits form
	 */
	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		this.props.registerUser(newUser, this.props.history); 
	};

	/** 
	 *	Get specific error denotes by string from errors prop
	 *	@param {String} e - type of error
	 *	@returns {String} - error message associated with error e
	 */
	getErrors = e => {
		const { errors } = this.state;
		if(errors.errors === undefined || errors.errors.find(x => x.param === e) === undefined)
		{
			return "";
		}
		else
		{
			return errors.errors.find(x => x.param === e).msg;
		}
	};

	render() {
		
		return (
			<div>
				<Center>
					<img src={quikLogo} width="275" height= "180" alt = "logo"/>
				</Center>
				<LoginForm>
					<h4>New User? Register below:</h4>
					<p>Already have an account? <Link to="/login">Log in</Link></p>
				<form noValidate onSubmit={this.onSubmit}>
					<TextField
						onChange={this.onChange}
						value={this.state.name}
						error={this.getErrors('name')!==""}
						helperText={this.getErrors('name')}
						id="name"
						label="Name"
						type="text"
						fullWidth
						className={classnames("", {
							invalid: this.getErrors('name')
		                })}
					/>
					<br/>
					<TextField
						onChange={this.onChange}
						value={this.state.email}
						error={this.getErrors('email')!==""}
						helperText={this.getErrors('email')}
						id="email"
						type="email"
						label="Email"
						fullWidth
						className={classnames("", {
                    		invalid: this.getErrors('email')
                  		})}
					/>
					<br/>
					<TextField
						onChange={this.onChange}
						value={this.state.password}
						error={this.getErrors('password')!==""}
						helperText={this.getErrors('password')}
						id="password"
						type="password"
						label="Password"
						fullWidth
						className={classnames("", {
                    		invalid: this.getErrors('password')
                  		})}
					/>
					<br/>
					<TextField
						onChange={this.onChange}
						value={this.state.password2}
						error={this.getErrors('password')!==""}
						helperText={this.getErrors('password')}
						id="password2"
						type="password"
						label="Confirm Password"
						fullWidth
						className={classnames("", {
                    		invalid: this.getErrors('password')
                  		})}
					/>
					<br/>
					<br/>
					<div>
					<Button 
						variant="contained" 
						color="primary" 
						type="submit"
						fullWidth
					>
        			Register
      				</Button>
					</div>
				</form>
				</LoginForm>
			</div>
		);
	}
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors[REGISTER_USER.ERROR]
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
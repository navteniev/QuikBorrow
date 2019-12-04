import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/index";
import classnames from "classnames";
import styled from 'styled-components';
import quikLogo from '../../components/quikLogo.png';
import { Button, TextField } from "@material-ui/core";
import { LOGIN_USER } from '../../actions/types'

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

export class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: ""
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
		  this.props.history.push("/products");
		}
	}
	componentWillReceiveProps(nextProps) {
    	if (nextProps.auth.isAuthenticated) {
      		this.props.history.push("/products"); // push user to dashboard when they login
    	}
  	}
	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	onSubmit = e => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(userData);
	};
	getErrors = e => {
		const { errors } = this.props;
		if (!errors || errors.errors === undefined || errors.errors.find(x => x.param === e) === undefined)
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
						<h3 style = {{textAlign:'center'}}>Login</h3>
					<form noValidate onSubmit={this.onSubmit}>
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
					<p>Dont have an account? <Link to="/register">Register</Link></p>
					<div>
					<Button 
						variant="contained" 
						color="primary" 
						type="submit"
						fullWidth
					>
        			Login
      				</Button>
					</div>
				</form>
				</LoginForm>
			</div>
		);
	}
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors[LOGIN_USER.ERROR]
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);

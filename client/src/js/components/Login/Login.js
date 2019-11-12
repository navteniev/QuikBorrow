import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/index";
import classnames from "classnames";

export class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {}
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
		  this.props.history.push("/dashboard");
		}
	}
	componentWillReceiveProps(nextProps) {
    	if (nextProps.auth.isAuthenticated) {
      		this.props.history.push("/dashboard"); // push user to dashboard when they login
    	}
		if (nextProps.errors) {
      		this.setState({
        		errors: nextProps.errors
      		});
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
		const { errors } = this.state;
		if (errors.errors === undefined || errors.errors.find(x => x.param === e) === undefined)
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
				<Link to="/"> Back to home</Link>
				<div>
					<h4><b>Login</b> below</h4>
					<p>Dont have an account? <Link to="/register">Register</Link></p>
				</div>
				<form noValidate onSubmit={this.onSubmit}>
					<div>
						<input
							onChange={this.onChange}
							value={this.state.email}
							error={this.getErrors('email')}
							id="email"
							type="email"
							className={classnames("", {
                    			invalid: this.getErrors('email')
                  			})}
						/>
						<span>{this.getErrors('email')}</span>
						<label htmlFor="email">Email</label>
					</div>
					<div>
						<input
							onChange={this.onChange}
							value={this.state.password}
							error={this.getErrors('password')}
							id="password"
							type="password"
							className={classnames("", {
                    			invalid: this.getErrors('password')
                  			})}
						/>
						<span>{this.getErrors('password')}</span>
						<label htmlFor="password">Password</label>
					</div>
					<div>
						<button type="submit">Login</button>
					</div>
				</form>
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
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);

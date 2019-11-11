import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/index";
import classnames from "classnames";

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

	componentDidMount() {
		// If logged in and user navigates to Register page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
		  this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
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
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		this.props.registerUser(newUser, this.props.history); 
	};
	render() {
		const { errors } = this.state;
		return (
			<div>
				<Link to="/"> Back to home</Link>
				<div>
					<h4><b>Register</b> below</h4>
					<p>Already have an account? <Link to="/login">Log in</Link></p>
				</div>
				<form noValidate onSubmit={this.onSubmit}>
					<div>
					<input
						onChange={this.onChange}
						value={this.state.name}
						error={errors.name}
						id="name"
						type="text"
						className={classnames("", {
		                    invalid: errors.name
		                })}
					/>
					<span>{errors.name}</span>
					<label htmlFor="name">Name</label>
					</div>
					<div>
					<input
						onChange={this.onChange}
						value={this.state.email}
						error={errors.email}
						id="email"
						type="email"
						className={classnames("", {
                    		invalid: errors.email
                  		})}
					/>
					<span>{errors.email}</span>
					<label htmlFor="email">Email</label>
					</div>
					<div>
					<input
						onChange={this.onChange}
						value={this.state.password}
						error={errors.password}
						id="password"
						type="password"
						className={classnames("", {
                    		invalid: errors.password
                  		})}
					/>
					<span>{errors.password}</span>
					<label htmlFor="password">Password</label>
					</div>
					<div>
					<input
						onChange={this.onChange}
						value={this.state.password2}
						error={errors.password2}
						id="password2"
						type="password"
						className={classnames("", {
                    		invalid: errors.password2
                  		})}
					/>
					<span>{errors.password2}</span>
					<label htmlFor="password2">Confirm Password</label>
					</div>
					<div>
						<button type="submit">Sign up</button>
					</div>
				</form>
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
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
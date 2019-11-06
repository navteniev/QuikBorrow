import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {}
		};
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
		console.log(userData);
	};
	render() {
		const { errors } = this.state;
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
							error={errors.email}
							id="email"
							type="email"
						/>
						<label htmlFor="email">Email</label>
					</div>
					<div>
						<input
							onChange={this.onChange}
							value={this.state.password}
							error={errors.password}
							id="password"
							type="password"
						/>
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
export default Login;
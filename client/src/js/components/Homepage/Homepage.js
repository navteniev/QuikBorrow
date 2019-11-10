import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import quikLogo from './quikLogo.png';

const Center = styled.div`
	text-align: center;
`
const Button = styled.button`
  font-size: 2em;
  margin: 1em;
  padding: 0.35em 2.5em;
  border-radius: 5px;
  background: royalblue;
  color: white;
`

class Homepage extends Component {
	render() {
		return (
			<div>
				<Center>
				<img src={quikLogo} alt = "logo"/>
					<div>
						<Link to="/register">
						<Button> Register </Button>
						</Link>
						<Link to="/login">
						<Button> Log In </Button>
						</Link>
					</div>
				</Center>
			</div>
		);
	}
}
export default Homepage;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Button} from 'primereact/button';
import styled from 'styled-components';
import quikLogo from './quikLogo.png';

const Center = styled.div`
	text-align: center;
`

class Homepage extends Component {
	render() {
		return (
			<div>
				<Center>
				<img src={quikLogo}/>
					<div>
						<Link to="/register">
						<Button label="Register" className = "p-button raised p-button-rounded" />
						</Link>
						<Link to="/login">
						<Button label="Log In" className= "p-button raised p-button-rounded"/>
						</Link>
					</div>
				</Center>
			</div>
		);
	}
}
export default Homepage;
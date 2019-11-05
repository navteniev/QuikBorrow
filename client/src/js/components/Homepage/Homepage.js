import React, { Component } from "react";
import { Link } from "react-router-dom";

class Homepage extends Component {
  render() {
    return (
      <div>
          <div>
            <h4>quiKBorrow</h4>
			<div>
              <Link to="/register">Register</Link>
              <Link to="/login">Log In</Link>
            </div>
          </div>
      </div>
    );
  }
}
export default Homepage;
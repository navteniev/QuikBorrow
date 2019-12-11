import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/users";

export class Dashboard extends Component {
  componentDidMount () {
    if (this.props.auth.isAuthenticated !== true) {
      this.props.history.push('/login')
    }
  }
  componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated !== true) {
          this.props.history.push("/login");
      }
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
    render() {
    const { user } = this.props.auth;
    return (
      <div>
        <h4>
          <b>Welcome</b>. You are logged in.
        </h4>
        <button onClick={this.onLogoutClick}>Logout</button>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedIn from './SignedIn';
import SignedOut from './SignedOut';

const Navbar = (props) => {
    return (
        <nav className="nav-wrapper light-blue">
            <div className="container">
                <Link to='/' className="brand-logo">QuikBorrow</Link>
                {props.auth.isAuthenticated ? <SignedIn name={props.auth.user.name} /> : <SignedOut />}
            </div>
        </nav>
    )
}

function mapStateToProps(state) {
    return { auth : state.auth }
}

export default connect(
    mapStateToProps, 
    null
)(Navbar);

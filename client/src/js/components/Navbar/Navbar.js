import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedIn from './SignedIn';
import SignedOut from './SignedOut';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="nav-wrapper light-blue">
                <div className="container">
                    <Link to='/' className="brand-logo">QuikBorrow</Link>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return { auth : state.auth }
}

export default connect(
    mapStateToProps
)(Navbar);

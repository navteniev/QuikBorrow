import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';

const SignedIn = (props) => {
    const onClick = e => {
        e.preventDefault();
        props.logoutUser();
    };

    return (
        <ul className="right">
            <li><NavLink to='/products'>Products</NavLink></li>
            <li><NavLink to='/profile' className='btn btn-floating red'>{props.name}</NavLink></li>
            <li><NavLink to='#' onClick={onClick}>Log Out</NavLink></li>
        </ul>
    )
}

export default connect(null, { logoutUser })(SignedIn);

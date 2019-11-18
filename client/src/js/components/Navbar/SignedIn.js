import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import { Toolbar } from '@material-ui/core';
import styled from 'styled-components'

const UnstyledLink = styled(Link)`
    color: inherit;
    text-decoration: inherit;
    margin-left: 20px;
`

const SignedIn = (props) => {
    const onClick = e => {
        e.preventDefault();
        props.logoutUser();
    };

    return (
        <Toolbar>
            <UnstyledLink to='/products'>Products</UnstyledLink>
            <UnstyledLink to='/profile'>{props.name}</UnstyledLink>
            <UnstyledLink to='#' onClick={onClick}>Products</UnstyledLink>
        </Toolbar>
    )
}

export default connect(null, { logoutUser })(SignedIn);

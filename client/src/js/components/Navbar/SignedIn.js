import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import { Toolbar, Avatar } from '@material-ui/core';
import styled from 'styled-components'
import Collapse from './Collapse'

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
    const userProfileId = props.id 
    // work in progress to make navbar profile link to specific profiler user ;-; profile/:profileId 
    return (
        <Toolbar>
            <UnstyledLink to='/products'>Products</UnstyledLink>
            <UnstyledLink to={ '/profile/'+userProfileId}><Avatar src='https://avatars1.githubusercontent.com/u/619960?s=460&v=4'/> </UnstyledLink>
            <UnstyledLink to='#' onClick={onClick}>Sign Out</UnstyledLink>
        </Toolbar>
    )
}

export default connect(null, { logoutUser })(SignedIn);

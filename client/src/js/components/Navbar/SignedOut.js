import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar } from '@material-ui/core';
import styled from 'styled-components'

const UnstyledLink = styled(Link)`
    color: inherit;
    text-decoration: inherit;
    margin-left: 20px;
`

const SignedOut = () => {
    return (
        <Toolbar>
            <UnstyledLink id='login' to='/login'>Login</UnstyledLink>
            <UnstyledLink id='register' to='/register'>Register</UnstyledLink>
        </Toolbar>
    )
}

export default SignedOut;
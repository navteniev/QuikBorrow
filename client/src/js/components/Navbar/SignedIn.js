import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/users';
import { Toolbar, Avatar } from '@material-ui/core';
import AddItemModal from '../AddItemModal/AddItemModal';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const UnstyledLink = styled(Link)`
    color: inherit;
    text-decoration: inherit;
    margin-left: 20px;
`

export const SignedIn = (props) => {
    const history = useHistory();

    const onClick = e => {
        e.preventDefault();
        history.push('/login');
        props.logoutUser();
    };
    const userProfileId = props.id 

    const [ openModal, setOpenModal ] = useState(false)

    return (
        <Toolbar>
            <AddItemModal open={openModal} onClose={e => setOpenModal(false)} />
            
            <UnstyledLink to='#' onClick={e => setOpenModal(true)}>Add Item</UnstyledLink>
            <UnstyledLink id='products' to='/products'>Products</UnstyledLink>
            <UnstyledLink id='profile' to={ '/profile/'+userProfileId}><Avatar src='https://avatars1.githubusercontent.com/u/619960?s=460&v=4'/> </UnstyledLink>
            <UnstyledLink id='sign-out' to='#' onClick={onClick}>Sign Out</UnstyledLink>
        </Toolbar>
    )
}

export default connect(null, { logoutUser })(SignedIn);

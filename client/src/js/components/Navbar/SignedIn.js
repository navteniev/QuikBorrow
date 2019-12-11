import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import { Toolbar, Avatar } from '@material-ui/core';
import styled from 'styled-components'
import AddItemModal from '../AddItemModal/AddItemModal';

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

    const [ openModal, setOpenModal ] = useState(false)

    return (
        <Toolbar>
            <AddItemModal open={openModal} onClose={e => setOpenModal(false)} />
            
            <UnstyledLink onClick={e => setOpenModal(true)}>Add Item</UnstyledLink>
            <UnstyledLink to='/products'>Products</UnstyledLink>
            <UnstyledLink to={ '/profile/'+userProfileId}><Avatar src='https://avatars1.githubusercontent.com/u/619960?s=460&v=4'/> </UnstyledLink>
            <UnstyledLink to='#' onClick={onClick}>Sign Out</UnstyledLink>
        </Toolbar>
    )
}

export default connect(null, { logoutUser })(SignedIn);

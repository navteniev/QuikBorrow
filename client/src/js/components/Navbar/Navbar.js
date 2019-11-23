import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal'

const UnstyledLink = styled(Link)`
    color: inherit;
    text-decoration: inherit;
`

export class Navbar extends React.Component {
    render() {
        return (
            <AppBar position='fixed' style={{background: teal[500], boxShadow: 'none', color: 'white'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>
                        <Typography variant="h5" component='h5' style={{flexGrow: 1}}>
                            <UnstyledLink to='/' className='brand-logo'>
                            QuikBorrow
                            </UnstyledLink>
                        </Typography>
                    {this.props.auth.isAuthenticated ? <SignedIn name={this.props.auth.user.name} /> : <SignedOut />}
                </Toolbar>
            </AppBar>
        )
    }
}

function mapStateToProps(state) {
    return { auth : state.auth }
}

export default connect(
    mapStateToProps
)(Navbar);

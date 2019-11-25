import React, { Component } from "react";
import ProfileCard from './ProfileCard'
import { connect } from "react-redux";
import { getUserProfile } from "../../actions";
import styled from 'styled-components';


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 21,
            college:'City College of New York',
            bio: 'Currently a student looking for a full time job',
            products: [{ // i guess these are the products he can lend lol
                id: 2,
                item: 'Pencil',
                description: 'It is a nice muji pencil'
                },{
                id: 3,
                item: 'Phone',
                description:'Sparkling new apple phone'
                }],
            wishlist: [{
                id:1,
                item:"pokemon cards"
                },{
                id:2,
                item:"calculator"
                }] 
        }
    }

    componentDidMount(){
        this.props.getUserProfile(this.props.match.params.profileId) // getting userProfile based on Id

    }
    render() {
        let {age , college, products,bio, wishlist } = this.state
        let {_id,name, rating,email} = this.props.user 
        if (!_id) {
            return <h3> User profile does not exist</h3>
        }
        else {
            return (
            <ProfileCard
            name={name}
            age={age}
            college={college}
            products={products}
            bio={bio}
            wishlist={wishlist}
            rating={rating}
            email={email}
            />
                )
        }
    }
}


function mapStateToProps(state) {
    return { user : state.user }
}

export default connect(mapStateToProps, { getUserProfile })(UserProfile);
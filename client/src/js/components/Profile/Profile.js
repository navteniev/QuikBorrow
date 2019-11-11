import React, { Component } from "react";
import ProfileCard from './ProfileCard'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            name: 'Tester2',
            age: 21,
            college:'City College of New York',
            products: [{ // i guess these are the products he can lend lol
                id: 2,
                item: 'Pencil',
                description: 'It is a nice muji pencil'
                },{
                id: 3,
                item: 'Phone',
                description:'Sparkling new apple phone'
                }],
            bio: 'Currently a student looking for a full time job',
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
        /* fetch userprofile from database */
    }
    render() {
        let { id,name, age , college, products,bio, wishlist } = this.state
        if (id === 'undefined' || id === null) {
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
            />
                )
        }
    }
}

export default UserProfile;
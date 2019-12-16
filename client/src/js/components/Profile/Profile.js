import React, { Component } from "react";
import ProfileCard from './ProfileCard'
import { connect } from "react-redux";
import { fetchProducts, fetchTransactions } from "../../actions/products";
import { getUserProfile } from "../../actions/users";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 21,
            college:'City College of New York',
            bio: 'Currently a student looking for a full time job',
            wishlist: [{
                _id:1,
                item:"pokemon cards"
                },{
                _id:2,
                item:"calculator"
                }] 
        }
    }

    componentDidMount(){
        this.props.getUserProfile(this.props.match.params.profileId) // getting userProfile based on Id
        this.props.fetchProducts()
        console.log(this.props.auth.user.id)
        this.props.fetchTransactions(this.props.auth.user.id)
    }

    render() {
        let {age , college,bio, wishlist } = this.state
        let {_id, name, rating, email} = this.props.user 
        let mylist = this.props.products
        
        const lendinglist = []

        for (let i =0; i < mylist.length; ++i){
            if(_id === mylist[i].user){
                lendinglist.push(mylist[i])
            }
        }
        
        if (!_id) {
            return <h3> User profile does not exist</h3>
        }
        else {
            return (
            <ProfileCard
            name={name}
            age={age}
            college={college}
            products={lendinglist}
            bio={bio}
            wishlist={wishlist}
            rating={rating}
            email={email}
            transactions={this.props.transactions}
            />
                )
        }
    }
}


function mapStateToProps(state) {
    return { user : state.user ,
             products : state.products,
             transactions: state.transactions.data,
             auth: state.auth, }
}

export default connect(mapStateToProps, { getUserProfile, fetchProducts, fetchTransactions })(Profile);
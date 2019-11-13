import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class ProductDetail extends Component {
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.productId);
    }

    // Just some initial rendering to make sure it works before styling
    renderDetail() {
        return (
            <div>
                <h3>{this.props.product.name}</h3>
                <h3>{this.props.product.description}</h3>
                <h3>{this.props.product._id}</h3>
                <h3>{this.props.product.availability ? 'true' : 'false'}</h3>
                <h3>{this.props.product.user}</h3>
            </div>
        )
    }
    
    render() {
        return <div>{this.renderDetail()}</div>
    }
}

function mapStateToProps(state) {
    console.log(state);
    return { product : state.product }
}

export default connect(mapStateToProps, actions)(ProductDetail);
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class ProductDetail extends Component {
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.productId);
    }

    renderDetail() {
        return this.props.product.map(prod => {
            return (
              <div>
                <h3>{prod._id}</h3>
                <h3>{prod.name}</h3>
                <h3>{prod.user}</h3>
                <h3>{prod.description}</h3>
                <h3>{prod.availability}</h3>
              </div>
            );
          });
    }
    
    render() {
        return (
        <div>
            {this.renderDetail()}
        </div>
        )
    }
}

function mapStateToProps(state) {
    return { product : state.product }
}

export default connect(mapStateToProps, actions)(ProductDetail);
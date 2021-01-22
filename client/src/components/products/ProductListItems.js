import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import trolly from "../../images/trolly2.jpg";
class ProductListItems extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className="row">
        <div className="col-12 text-center">
          <Link to={`/product/${products._id}`}>
            <img
              src={trolly}
              alt=""
              className="rounded-circle"
              style={{ width: "100px", height: "100px" }}
            />
            <h4>{products.name}</h4>
          </Link>
        </div>
      </div>
    );
  }
}
ProductListItems.propTypes = {
  products: PropTypes.object.isRequired,
};
export default ProductListItems;

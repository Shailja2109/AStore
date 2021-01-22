import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import trolly from "../../images/trolly2.jpg";
class SubCategoryItems extends Component {
  render() {
    const { subCategories } = this.props;
    return (
      <div className="col-4 text-center">
        <Link to={`/products/${subCategories._id}`}>
          <img
            src={trolly}
            alt=""
            className="rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
          <h4>{subCategories.name}</h4>
        </Link>
      </div>
    );
  }
}
SubCategoryItems.propTypes = {
  subCategories: PropTypes.object.isRequired,
};
export default SubCategoryItems;

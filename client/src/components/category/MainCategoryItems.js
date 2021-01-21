import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import trolly from "../../images/trolly2.jpg";
class CategoryItems extends Component {
  render() {
    const { MainCategories } = this.props;
    return (
      <div className="col-4 text-center">
        <Link to={`/Category/${MainCategories._id}`}>
          <img
            src={trolly}
            alt=""
            className="rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
          <h4>{MainCategories.name}</h4>
        </Link>
      </div>
    );
  }
}
CategoryItems.propTypes = {
  MainCategories: PropTypes.object.isRequired,
};
export default CategoryItems;

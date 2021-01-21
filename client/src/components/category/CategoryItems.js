import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import trolly from "../../images/trolly2.jpg";
class CategoryItems extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div className="col-4 text-center">
        <Link to={`/Category/${categories._id}`}>
          <img
            src={trolly}
            alt=""
            className="rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
          <h4>{categories.name}</h4>
        </Link>
      </div>
    );
  }
}
CategoryItems.propTypes = {
  categories: PropTypes.object.isRequired,
};
export default CategoryItems;

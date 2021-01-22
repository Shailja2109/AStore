import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GetLandingCategory } from "../../actions/categoryActions";
import CategoryItems from "./CategoryItems";

class Category extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.GetLandingCategory(this.props.match.params.id);
    }
  }
  render() {
    const { categories } = this.props.categories;
    let CategoriesItem;
    if (categories === null) {
      CategoriesItem = "asdjk";
    } else {
      if (categories.length > 0) {
        CategoriesItem = categories.map((categories) => (
          <CategoryItems key={categories._id} categories={categories} />
        ));
      } else {
        CategoriesItem = <h3>no category found</h3>;
      }
    }
    return (
      <div className="m-3">
        <div className="container">
          <div className="card card-body bg-light mb-3">
            <div className="row">{CategoriesItem}</div>
          </div>
        </div>
      </div>
    );
  }
}
Category.propTypes = {
  GetLandingCategory: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  categories: state.categories,
});
export default connect(mapStateToProps, { GetLandingCategory })(Category);

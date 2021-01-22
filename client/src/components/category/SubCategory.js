import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GetLandingSubCategory } from "../../actions/categoryActions";
import SubCategoryItems from "./SubCategoryItems";

class SubCategory extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.GetLandingSubCategory(this.props.match.params.id);
    }
  }
  render() {
    const { SubCategories } = this.props.categories;
    let SubCategoriesItem;
    if (SubCategories === null) {
      SubCategoriesItem = "asdjk";
    } else {
      if (SubCategories.length > 0) {
        SubCategoriesItem = SubCategories.map((subCategories) => (
          <SubCategoryItems
            key={subCategories._id}
            subCategories={subCategories}
          />
        ));
      } else {
        SubCategoriesItem = <h3>no category found</h3>;
      }
    }
    return (
      <div className="m-3">
        <div className="container">
          <div className="card card-body bg-light mb-3">
            <div className="row">{SubCategoriesItem}</div>
          </div>
        </div>
      </div>
    );
  }
}
SubCategory.propTypes = {
  GetLandingSubCategory: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  categories: state.categories,
});
export default connect(mapStateToProps, { GetLandingSubCategory })(SubCategory);

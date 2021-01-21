import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GetLandingMainCategory } from "../../actions/categoryActions";
import MainCategoryItems from "./MainCategoryItems";

class MainCategory extends Component {
  componentDidMount() {
    this.props.GetLandingMainCategory();
  }
  render() {
    const { MainCategories } = this.props.categories;
    let MainCategoriesItem;
    if (MainCategories === null) {
      MainCategoriesItem = "asdjk";
    } else {
      if (MainCategories.length > 0) {
        MainCategoriesItem = MainCategories.map((MainCategories) => (
          <MainCategoryItems
            key={MainCategories._id}
            MainCategories={MainCategories}
          />
        ));
      } else {
        MainCategoriesItem = <h3>no main category found</h3>;
      }
    }
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">{MainCategoriesItem}</div>
        </div>
      </div>
    );
  }
}
MainCategory.propTypes = {
  GetLandingMainCategory: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  categories: state.categories,
});
export default connect(mapStateToProps, { GetLandingMainCategory })(
  MainCategory
);

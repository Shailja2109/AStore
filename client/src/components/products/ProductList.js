import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GetProducts } from "../../actions/productActions";
import ProductListItems from "./ProductListItems";
import Spinner from "../common/Spinner";

class ProductList extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.GetProducts(this.props.match.params.id);
    }
  }
  render() {
    const { products, loding } = this.props.products;
    let productsItem;
    if (products === null || loding) {
      productsItem = <Spinner />;
    } else {
      if (products.length > 0) {
        productsItem = products.map((products) => (
          <ProductListItems key={products._id} products={products} />
        ));
      } else {
        productsItem = <h3>no main category found</h3>;
      }
    }
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">{productsItem}</div>
      </div>
    );
  }
}
ProductList.propTypes = {
  GetProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products,
});
export default connect(mapStateToProps, { GetProducts })(ProductList);

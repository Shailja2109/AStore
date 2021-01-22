const express = require("express");
const router = express.Router();
const passport = require("passport");

const CategoryController = require("../../../Controller/CategoryController");
const ProductController = require("../../../Controller/ProductController");

// @route   GET /maincategory
// @desc    Return list of main categories already there
// @access  public
router.get("/maincategory", CategoryController.getLandingMainCategory);

// @route   GET /category/id
// @desc    Return list of categories
// @access  public
router.get("/category/:id", CategoryController.getLandingCategory);

// @route   GET /subCategory/id
// @desc    Return list of sub categories
// @access  public
router.get("/subCategory/:id", CategoryController.getLandingSubcategory);

// @route   GET /product/:id
// @desc    Return list of product
// @access  public
router.get(
  "/products/:sub_category_id",
  ProductController.getPublicProductlist
);

module.exports = router;

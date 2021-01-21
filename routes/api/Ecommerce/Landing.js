const express = require("express");
const router = express.Router();
const passport = require("passport");

const CategoryController = require("../../../Controller/CategoryController");

// @route   GET /maincategory
// @desc    Return list of main categories already there
// @access  public
router.get("/maincategory", CategoryController.getLandingMainCategory);

// @route   GET /category/id
// @desc    Return list of categories
// @access  public
router.get("/category/:id", CategoryController.getLandingCategory);

module.exports = router;

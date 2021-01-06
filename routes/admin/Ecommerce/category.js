const express = require('express');
const router = express.Router();
const passport = require('passport');
const CategoryController = require('../../../Controller/CategoryController.js')
const admin = require('../admin_auth')

// @route   GET admin/ecommerce/maincategory
// @desc    Return list of main categories already there
// @access  Private
router.get('/maincategory',passport.authenticate('jwt', { session: false }),CategoryController.adminAccess, CategoryController.getMainCategory);


 // @route   GET admin/ecommerce/category
 // @desc    Return list of categories already there
 // @access  Private
 router.get('/category/:maincategory_id', passport.authenticate('jwt', { session: false }),CategoryController.adminAccess, CategoryController.getCategory);
  
 // @route   GET admin/ecommerce/subcategory
 // @desc    Return list of sub categories already there
 // @access  Private
 router.get('/subcategory/:category_id',passport.authenticate('jwt', { session: false }),CategoryController.adminAccess, CategoryController.getSubCategory);

// @route   Post admin/ecommerce/maincategory
// @desc    Add main category if not there 
// @access  Private
router.post('/maincategory',passport.authenticate('jwt', { session: false }), CategoryController.adminAccess, CategoryController.addMainCategory);

// @route   Post admin/ecommerce/maincategory/id
// @desc    Edit main category already there
// @access  Private
router.post('/maincategory/:category_id',passport.authenticate('jwt', { session: false }),CategoryController.adminAccess, CategoryController.updateMainCategory);

// @route   DELETE admin/ecommerce/maincategory/id
// @desc    Delete main category from list
// @access  Private
router.delete('/maincategory/:category_id',
  passport.authenticate('jwt', { session: false }),CategoryController.adminAccess, CategoryController.deleteMainCategory);

// @route   Post admin/ecommerce/category
// @desc    add category 
// @access  Private
router.post('/category', passport.authenticate('jwt', { session: false }),CategoryController.adminAccess, CategoryController.addCategory);

// @route   Post admin/ecommerce/category/id
// @desc    Edit category already there
// @access  Private
router.post('/category/:category_id', passport.authenticate('jwt', { session: false }), CategoryController.adminAccess, CategoryController.updateCategory);


// @route   DELETE admin/ecommerce/category/id
// @desc    Delete category from list
// @access  Private
router.delete('/category/:category_id', passport.authenticate('jwt', { session: false }), CategoryController.adminAccess, CategoryController.deleteCategory);

// @route   Post admin/ecommerce/subcategory
// @desc    add  subcategory 
// @access  Private
router.post('/subcategory',passport.authenticate('jwt', { session: false }),CategoryController.adminAccess, CategoryController.addSubCategory)

// @route   Post admin/ecommerce/subcategory/id
// @desc    edit sub category already there
// @access  Private
router.post('/subcategory/:subCategory_id', passport.authenticate('jwt', { session: false }),CategoryController.adminAccess, CategoryController.updateSubCategory);

// @route   DELETE  admin/ecommerce/subcategory/id
// @desc    Delete subcategory from list
// @access  Private
router.delete('/subcategory/:category_id', passport.authenticate('jwt', { session: false }), CategoryController.adminAccess, CategoryController.deleteSubCategory);

module.exports = router;
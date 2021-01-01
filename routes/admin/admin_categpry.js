const express = require('express');
const router = express.Router();
const passport = require('passport');

const checkAdminUser = require('../../validation/check-user');
const validateCategory = require('../../validation/category');
const validateSubCategory = require('../../validation/subcategory');

const Categories = require('../../models/category');
const SubCategories = require('../../models/subcategory.js');

// @route   Post admin/users/dashboard/product/category
// @desc    Return list of product category already there 
// @access  Private
router.post(
  '/dashboard/product/category',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      const { errors, isValid } = checkAdminUser(req.user);
      if (!isValid) {
          return res.status(400).json(errors);
      }

      // check validation
      const {categoryError, categoryIsValid} = validateCategory(req.body);
      if (!categoryIsValid){
        res.json({msg : categoryError})
        return res.status(400).json(categoryError)
      }
    // console.log(req.body)
      
      const categoryfields = {}
      categoryfields.name = req.body.name;
      categoryfields.thumbnail = req.body.thumbnail;
      categoryfields.isActive = req.body.active;
      categoryfields.createdBy = req.body.createdBy;

        Categories.findOne({ name : categoryfields.name  }).then(category => {
        if (category) {
            res.json({msg : 'catego already exists' })
        } else {
        const category = new Categories(categoryfields);
          category
          .save()
          .then(category => res.json(category))
          .catch(err => console.log(err));
        }
      });  
  }
);

// @route   Post admin/users/dashboard/product/category/id
// @desc    Edit category 
// @access  Private
router.post(
  '/dashboard/product/category/:category_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      const { errors, isValid } = checkAdminUser(req.user);
      if (!isValid) {
          return res.status(400).json(errors);
      }

      // check validation
      const {categoryError, categoryIsValid} = validateCategory(req.body);
      if (!categoryIsValid){
        return res.status(400).json(categoryError)
      }
      console.log(req.body)
      const categoryfields = {}
      categoryfields.name = req.body.name;
      categoryfields.thumbnail = req.body.thumbnail;
      categoryfields.isActive = req.body.active;
      categoryfields.createdBy = req.body.createdBy;

      Categories.findByIdAndUpdate({_id: req.params.category_id}).then(category => {
        if (category) {
          Categories.findOneAndUpdate(
            {name : category.name},
            { $set: categoryfields },
            { new: true }
          ).then(res.json(categoryfields));
      }  
  });
  });


// @route   DELETE api/users/dashboard/product/category/id
// @desc    Delete category from list
// @access  Private
router.delete(
  '/dashboard/product/category/:category_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Categories.findByIdAndRemove({_id: req.params.category_id})
    .then(res.json({msg : 'deteled successfully'}))
    .catch(err => res.status(404).json(err));
  }
);

// @route   Post admin/users/dashboard/product/subcategory
// @desc    Return list of product category already there 
// @access  Private
router.post(
  '/dashboard/product/subcategory',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      const { errors, isValid } = checkAdminUser(req.user);
      if (!isValid) {
          return res.status(400).json(errors);
      }

      const {subCategoryError, subCategoryIsValid} = validateSubCategory(req.body);
      if (!subCategoryIsValid){
        res.json({msg: subCategoryError})
        return res.status(400).json(subCategoryError)
      }
   
      const subCategoryfields = {}
      subCategoryfields.categoryId = req.body.categoryId;
      subCategoryfields.name = req.body.name;
      subCategoryfields.thumbnail = req.body.thumbnail;
      subCategoryfields.isActive = req.body.active;
      subCategoryfields.createdBy = req.body.createdBy;

      SubCategories.findOne({ name : subCategoryfields.name  }).then(sub_category => {
        if (sub_category) {
          res.json({msg : 'catego already exists' })
      } else {
      const sub_category = new SubCategories(subCategoryfields);
      sub_category
        .save()
        .then(sub_category => res.json(sub_category))
        .catch(err => console.log(err));
      } 
  });
  })

// @route   Post admin/users/dashboard/product/subcategory/id
// @desc    Return list of product category already there 
// @access  Private
router.post(
  '/dashboard/product/subcategory/:sub_category_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      const { errors, isValid } = checkAdminUser(req.user);
      if (!isValid) {
          return res.status(400).json(errors);
      }

      // check validation
      const {subCategoryError, subCategoryIsValid} = validateSubCategory(req.body);
      if (!subCategoryIsValid){
       
        return res.status(400).json(subCategoryError)
      }
      const subCategoryfields = {}
      subCategoryfields.name = req.body.name;
      subCategoryfields.thumbnail = req.body.thumbnail;
      subCategoryfields.isActive = req.body.active;
      subCategoryfields.createdBy = req.body.createdBy;

      SubCategories.findByIdAndUpdate({_id: req.params.sub_category_id}).then(subCategory => {
        if (subCategory) {
          SubCategories.findOneAndUpdate(
            {name : subCategory.name},
            { $set: subCategoryfields },
            { new: true },
          ).then(res.json(subCategory));
        }
      });
  });

// @route   DELETE  admin/users/dashboard/product/subcategory/id
// @desc    Delete subcategory from list
// @access  Private
router.delete(
  '/dashboard/product/subcategory/:sub_category_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    SubCategories.findByIdAndRemove({_id: req.params.sub_category_id})
    .then(res.json({msg : 'deteled successfully'}))
    .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
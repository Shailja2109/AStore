const express = require('express');
const router = express.Router();
const passport = require('passport');

const checkAdminUser = require('../../../validation/check-user');
const validateMainCategory = require('../../../validation/main-category');
const validateCategory = require('../../../validation/category');
const validateSubCategory = require('../../../validation/sub-category');

const MainCategories = require('../../../models/main-category');
const SubCategories = require('../../../models/sub-category');
const Categories = require('../../../models/category');

// @route   GET admin/ecommerce/maincategory
// @desc    Return list of main categories already there 
// @access  Private
router.get(
  '/maincategory',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      const { accessErrors, accessIsValid } = checkAdminUser(req.user);
      if (!accessIsValid) {
          return res.status(400).json(accessErrors);
      }

      MainCategories.find({}).exec(function(err, result) {res.json(result)})
  }
);
// @route   GET admin/ecommerce/category
// @desc    Return list of categories already there 
// @access  Private
router.get(
  '/category/:maincategory_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      const { accessErrors, accessIsValid } = checkAdminUser(req.user);
      if (!accessIsValid) {
          return res.status(400).json(accessErrors);
      }
      Categories.find({main_category: req.params.maincategory_id}).exec(function(err, result) {res.json(result)})
    });

// @route   GET admin/ecommerce/subcategory
// @desc    Return list of sub categories already there 
// @access  Private
router.get(
  '/subcategory/:category_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { accessErrors, accessIsValid } = checkAdminUser(req.user);
    if (!accessIsValid) {
        return res.status(400).json(accessErrors);
    }
      SubCategories.find({category: req.params.category_id}).exec(function(err, result) {res.json(result)}
      )}
);

// @route   Post admin/ecommerce/maincategory
// @desc    Add main category if not there 
// @access  Private
router.post(
  '/maincategory',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { accessErrors, accessIsValid } = checkAdminUser(req.user);
    if (!accessIsValid) {
        return res.status(400).json(accessErrors);
    }

      const {errors, isValid} = validateMainCategory(req.body);
      if (!isValid){
        return res.status(400).json(errors)
      }
      
      const categoryfields = {}
      categoryfields.name = req.body.name;
      categoryfields.thumbnail = req.body.thumbnail;
      categoryfields.isActive = req.body.isActive;
      categoryfields.createdBy = req.user.id;
     
      MainCategories.findOne({ name : categoryfields.name  }).then(category => {
      if (category) {
          res.json({msg : 'catego already exists' })
      } else {
        const category = new MainCategories(categoryfields);
        category
        .save()
        .then(category => res.json(category))
        .catch(err => console.log(err));
      }
      });  
  });

// @route   Post admin/ecommerce/maincategory/id
// @desc    Edit main category already there
// @access  Private
router.post(
  '/maincategory/:category_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { accessErrors, accessIsValid } = checkAdminUser(req.user);
    if (!accessIsValid) {
        return res.status(400).json(accessErrors);
    }
      const {errors, isValid} = validateMainCategory(req.body);
      if (!isValid){
        res.json({msg : errors})
        return res.status(400).json(errors)
      }

      const categoryfields = {}
      categoryfields.name = req.body.name;
      categoryfields.thumbnail = req.body.thumbnail;
      categoryfields.isActive = req.body.isActive;
      categoryfields.createdBy = req.user.id;

      MainCategories.findByIdAndUpdate({_id: req.params.category_id}).then(category => {
        if (category) {
          MainCategories.findOneAndUpdate(
            {name : category.name},
            { $set: categoryfields },
            { new: true }
          ).then(res.json(categoryfields));
      }  
  });
  });

// @route   DELETE admin/ecommerce/maincategory/id
// @desc    Delete main category from list
// @access  Private
router.delete(
  '/maincategory/:category_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { accessErrors, accessIsValid } = checkAdminUser(req.user);
    if (!accessIsValid) {
        return res.status(400).json(accessErrors);
    }
    MainCategories.findByIdAndRemove({_id: req.params.category_id})
    .then(res.json({msg : 'deteled successfully'}))
    .catch(err => res.status(404).json(err));
  }
);

// @route   Post admin/ecommerce/category
// @desc    add category 
// @access  Private
router.post(
  '/category',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { accessErrors, accessIsValid } = checkAdminUser(req.user);
    if (!accessIsValid) {
        return res.status(400).json(accessErrors);
    }

      const {errors, isValid} = validateCategory(req.body);
      if (!isValid){
        res.json({msg : errors})
        return res.status(400).json(errors)
      }
      
      const categoryfields = {}
      categoryfields.name = req.body.name;
      categoryfields.thumbnail = req.body.thumbnail;
      categoryfields.isActive = req.body.isActive;
      categoryfields.createdBy = req.user.id;
      categoryfields.main_category = req.body.main_category;

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
  });

// @route   Post admin/ecommerce/category/id
// @desc    Edit category already there
// @access  Private
router.post(
  '/category/:category_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { accessErrors, accessIsValid } = checkAdminUser(req.user);
    if (!accessIsValid) {
        return res.status(400).json(accessErrors);
    }
      const { errors, isValid } = validateCategory(req.body);
      if (!isValid){
        return res.status(400).json(errors)
      }

      const categoryfields = {}
      categoryfields.name = req.body.name;
      categoryfields.thumbnail = req.body.thumbnail;
      categoryfields.isActive = req.body.isActive;
      categoryfields.createdBy = req.user.id;
      categoryfields.main_category = req.body.main_category;

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


// @route   DELETE admin/ecommerce/category/id
// @desc    Delete category from list
// @access  Private
router.delete(
  '/category/:category_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { accessErrors, accessIsValid } = checkAdminUser(req.user);
    if (!accessIsValid) {
        return res.status(400).json(accessErrors);
    }
    Categories.findByIdAndRemove({_id: req.params.category_id})
    .then(res.json({msg : 'deteled successfully'}))
    .catch(err => res.status(404).json(err));
  }
);

// @route   Post admin/ecommerce/subcategory
// @desc    add  subcategory 
// @access  Private
router.post(
  '/subcategory',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { accessErrors, accessIsValid } = checkAdminUser(req.user);
    if (!accessIsValid) {
        return res.status(400).json(accessErrors);
    }
      const {errors, isValid} = validateSubCategory(req.body);
      if (!isValid){
        res.json({msg: errors})
        return res.status(400).json(errors)
      }
   
      const categoryfields = {}
      categoryfields.name = req.body.name;
      categoryfields.thumbnail = req.body.thumbnail;
      categoryfields.isActive = req.body.isActive;
      categoryfields.createdBy = req.user.id;
      categoryfields.main_category = req.body.main_category;
      categoryfields.category = req.body.category;

      SubCategories.findOne({ name : categoryfields.name  }).then(category => {
        if (category) {
          res.json({msg : 'catego already exists' })
      } else {
      const category = new SubCategories(categoryfields);
      category
        .save()
        .then(category => res.json(category))
        .catch(err => console.log(err));
      } 
  });
  })

// @route   Post admin/ecommerce/subcategory/id
// @desc    edit sub category already there
// @access  Private
router.post(
  '/subcategory/:subCategory_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { accessErrors, accessIsValid } = checkAdminUser(req.user);
    if (!accessIsValid) {
        return res.status(400).json(accessErrors);
    }
      const {errors, isValid} = validateSubCategory(req.body);
      if (!isValid){
        return res.status(400).json(errors)
      }

      const categoryfields = {}
      categoryfields.name = req.body.name;
      categoryfields.thumbnail = req.body.thumbnail;
      categoryfields.isActive = req.body.isActive;
      categoryfields.createdBy = req.user.id;
      categoryfields.main_category = req.body.main_category;
      categoryfields.category = req.body.category;

      SubCategories.findByIdAndUpdate({_id: req.params.subCategory_id}).then(category => {
        if (category) {
          SubCategories.findOneAndUpdate(
            {name : category.name},
            { $set: categoryfields },
            { new: true },
          ).then(res.json(category));
        }
      });
  });

// @route   DELETE  admin/ecommerce/subcategory/id
// @desc    Delete subcategory from list
// @access  Private
router.delete(
  '/subcategory/:category_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { accessErrors, accessIsValid } = checkAdminUser(req.user);
    if (!accessIsValid) {
        return res.status(400).json(accessErrors);
    }
    SubCategories.findByIdAndRemove({_id: req.params.category_id})
    .then(res.json({msg : 'deteled successfully'}))
    .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
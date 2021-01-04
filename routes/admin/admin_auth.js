const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const checkAdminUser = require('../../validation/check-user');
const validateCategory = require('../../validation/category');
const validateMainCategory = require('../../validation/main-category');
const validateSubCategory = require('../../validation/sub-category');

const User = require('../../models/User');
const MainCategories = require('../../models/main-category');
// const Categories = require('../../models/main-category');
const SubCategories = require('../../models/sub-category');
const category = require('../../models/category');

// @route   GET admin/register
// @desc    Register admin
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '250',
          r: 'pg',
          d: 'mm'
        });
  
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          contact: req.body.contact,
          avatar,
          role:keys.ADMIN,
          password: req.body.password
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  
  // @route   GET admin/users/login
  // @desc    Login admin User / Returning JWT Token
  // @access  Public
  router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      if(!(user.role === 'admin')){
        errors.email = 'User not admin, can not login';
        return res.status(404).json(errors);
      }
  
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name, avatar: user.avatar,role:user.role };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 36000 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
  });


// @route   GET admin/users/dashboard
// @desc    Return current user's dashboard
// @access  Private
router.get(
    '/dashboard',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.user)
        const { errors, isValid } = checkAdminUser(req.user);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            contact: req.user.contact
        });
    }
  );

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
            res.json({msg : 'category already exists' })
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
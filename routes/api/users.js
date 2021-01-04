const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateProfileInput = require('../../validation/profile')
const validateAddressInput = require('../../validation/address');

const User = require('../../models/User');
const Profile = require('../../models/profile');
const UserController = require('../../Controller/UsersController')

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register',UserController.userRegister );

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login',UserController.userlogin);

// @route   GET api/users/profile
// @desc    Return current user
// @access  Private
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      contact: req.user.contact
    });
  }
);

// @route   GET api/users/profile
// @desc    Return current user
// @access  Private
router.post(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.gender) profileFields.gender = req.body.gender;
      if (req.body.age) profileFields.age = req.body.age;
  
      Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          new Profile(profileFields).save().then(profile => res.json(profile));
        }
      });
    });

// @route   Post api/users/profile/manage address
// @desc    Return list of address
// @access  Private
router.post('/profile/manageAddress', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAddressInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const Address = {
        Home: req.body.Home,
        Street: req.body.Street,
        Landmark: req.body.Landmark,
        Pincode: req.body.Pincode,
        city: req.body.city,
        state: req.body.state,
        other: req.body.other
      };

      profile.delivery_address.unshift(Address);

      profile.save().then(profile => res.json(profile));
    });
  }
);
    
module.exports = router;

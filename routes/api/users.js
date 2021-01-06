const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/profile');

const validateProfileInput = require('../../validation/profile')
const validateAddressInput = require('../../validation/address');

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
router.get('/profile',
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
router.post('/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

      const { errors, isValid } = validateProfileInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { errors, isValid } = validateAddressInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.gender) profileFields.gender = req.body.gender;
      if (req.body.age) profileFields.age = req.body.age;
  
      profileFields.delivery_address = {};
      if (req.body.House) profileFields.delivery_address.House = req.body.House;
      if (req.body.Street) profileFields.delivery_address.Street = req.body.Street;
      if (req.body.Landmark) profileFields.delivery_address.Landmark = req.body.Landmark;
      if (req.body.Pincode) profileFields.delivery_address.Pincode = req.body.Pincode;
      if (req.body.city) profileFields.delivery_address.city = req.body.city;
      if (req.body.state) profileFields.delivery_address.state = req.body.state;
  
      Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
              errors.Profile = 'register to view your profile';
              res.status(400).json(errors);
        }
      });
    });
    
module.exports = router;

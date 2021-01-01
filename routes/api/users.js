const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
<<<<<<< HEAD
// const validateProfileInput = require('../../validation/profile');

const User = require('../../models/User');
const Profile = require('../../models/profile');
=======
const validateProfileInput = require('../../validation/profile')
const validateAddressInput = require('../../validation/address');

const User = require('../../models/User');
const Profile = require('../../models/profile.js');
>>>>>>> admin

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/users/register
// @desc    Register user
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
        password: req.body.password,
        role: req.body.role
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

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
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

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, role:user.role, name: user.name, avatar: user.avatar };
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

<<<<<<< HEAD
      // const { errors, isValid } = validateProfileInput(req.body);
      // if (!isValid) {
      //   return res.status(400).json(errors);
      // }

=======
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
>>>>>>> admin
      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.gender) profileFields.gender = req.body.gender;
      if (req.body.age) profileFields.age = req.body.age;
  
<<<<<<< HEAD
      profileFields.delivery_address = {};
      if (req.body.House) profileFields.delivery_address.House = req.body.House;
      if (req.body.Street) profileFields.delivery_address.Street = req.body.Street;
      if (req.body.Landmark) profileFields.delivery_address.Landmark = req.body.Landmark;
      if (req.body.Pincode) profileFields.delivery_address.Pincode = req.body.Pincode;
      if (req.body.city) profileFields.delivery_address.city = req.body.city;
      if (req.body.state) profileFields.delivery_address.state = req.body.state;
  
=======
>>>>>>> admin
      Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
<<<<<<< HEAD
              errors.Profile = 'register to view your profile';
              res.status(400).json(errors);
        }
      });
    });
=======
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
>>>>>>> admin
    
module.exports = router;

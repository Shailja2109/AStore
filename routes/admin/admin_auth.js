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

const User = require('../../models/User');

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
  
  // @route   GET admin/login
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
      console.log(req)
        const { errors, isValid } = checkAdminUser(req.user);
        if (!isValid) {
          res.json({msg: 'some error'})
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

module.exports = router;

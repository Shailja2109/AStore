const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController = require('../../Controller/UsersController');
const CustomerController = require('../../Controller/CustomerController');

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
  CustomerController.getCutomerProfile
);

// @route   GET api/users/profile
// @desc    Return current user
// @access  Private
router.post('/profile',
  passport.authenticate('jwt', { session: false }),
  CustomerController.CustomerProfile
);

// @route   GET api/users/address
// @desc    Return current user all address
// @access  Private
router.get('/address',
  passport.authenticate('jwt', { session: false }),
  CustomerController.getCustomerAddreess
)

// @route   GET api/users/address/:id
// @desc    get user address
// @access  Private
router.get('/address/:addressId',
  passport.authenticate('jwt', { session: false }),
  CustomerController.getAddress
)

// @route   POST api/users/addToAddress
// @desc    add & update user address
// @access  Private
router.post('/addToAddress',
  passport.authenticate('jwt', { session: false }),
  CustomerController.addAndUpadteAddress
)

// @route   DELETE api/users/address/:id
// @desc    delete user address
// @access  Private
router.delete('/address/:addressId',
  passport.authenticate('jwt', { session: false }),
  CustomerController.deleteAddress
)
    
module.exports = router;

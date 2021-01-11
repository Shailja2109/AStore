const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController = require('../../Controller/UsersController');
const CustomerController = require('../../Controller/CustomerController');
const { addToCart, removeCartItems }  = require('../../Controller/CartController');

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
// @desc    Return current user address
// @access  Private
router.get('/address',
  passport.authenticate('jwt', { session: false }),
  CustomerController.getCustomerAddreess
)

// @route   POST api/users/addToAddress
// @desc    add  user address
// @access  Private
router.post('/addToAddress',
  passport.authenticate('jwt', { session: false }),
  CustomerController.addAddress
)

// @route   GET api/users/cart
// @desc    Return current user
// @access  Private
router.get('/cart',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Cart.find({user : req.user.id}).exec(function(err, result) {res.json(result)})
  }
);

// @route   POST api/users/cart/addtocart
// @desc    add items to cart 
// @access  Private
router.post('/cart/addtocart',passport.authenticate('jwt', { session: false }), addToCart);

// @route   POST api/users/cart/removeItem/productId
// @desc    remove items from cart 
// @access  Private
router.post("/cart/removeItem/:product_id", passport.authenticate('jwt', { session: false }), removeCartItems);

module.exports = router;
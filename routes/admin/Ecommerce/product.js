const express = require('express');
const router = express.Router();
const isAccess = require('../../../validation/isAccess');
const prodcutController = require('../../../Controller/ProductController')
const passport = require('passport');

// @route   Post  admin/Ecommerce/product
// @desc    Adding product
// @access  Private
router.post('/product',passport.authenticate('jwt', { session: false }),prodcutController.addProduct);

module.exports = router;
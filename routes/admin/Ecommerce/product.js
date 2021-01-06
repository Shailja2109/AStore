const express = require('express');
const router = express.Router();
const productController = require('../../../Controller/ProductController')
const passport = require('passport');
const admin = require('../admin_auth')

// @route   GET  admin/Ecommerce/product
// @desc    get all products
// @access  Private
router.get('/product', passport.authenticate('jwt', { session: false }), productController.adminAccess,productController.getProduct);

// @route   Post  admin/Ecommerce/product
// @desc    Adding product
// @access  Private
router.post('/product', passport.authenticate('jwt', { session: false }), productController.adminAccess, productController.addProduct);

// @route   Post  admin/Ecommerce/product/product_id
// @desc    Updating product
// @access  Private
router.post('/product/:product_id', passport.authenticate('jwt', { session: false }), productController.adminAccess, productController.updateProduct);

// @route   Delete  admin/Ecommerce/product/product_id
// @desc    Deleting product
// @access  Private
router.delete('/product/:product_id', passport.authenticate('jwt', { session: false }), productController.adminAccess, productController.deleteProduct);

module.exports = router;
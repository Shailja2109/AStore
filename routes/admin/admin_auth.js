const express = require('express');
const router = express.Router();
const passport = require('passport');

const checkAdminUser = require('../../validation/check-user');

const UserController = require('../../Controller/UsersController')

// @route   GET admin/register
// @desc    Register admin
// @access  Public
router.post('/register',UserController.adminRegistration);
  
// @route   GET admin/login
// @desc    Login admin User / Returning JWT Token
// @access  Public
router.post('/login', UserController.adminLogIn);


// @route   GET admin/users/dashboard
// @desc    Return current user's dashboard
// @access  Private
router.get(
    '/dashboard',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
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

module.exports = router;

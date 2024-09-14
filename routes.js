const express = require('express');
//const authorize = require('./authMiddleware');
//const ROLES = require('./roles');
const { isAuthenticatedUser, isAuthorizedAdmin, isAuthorizedUser } = require('./auth');
const router = express.Router();

// Public route accessible by all
router.route('/public').get((req, res,next) => {
    res.send('This is a public route');
});

// Route accessible only to users with the 'User' role
router.route('/user').get(isAuthenticatedUser,isAuthorizedUser, (req, res,next) => {
    res.send('This route is for Users');
});

// Route accessible only to Admins
router.route('/admin').get( isAuthenticatedUser,isAuthorizedAdmin, (req, res,next) => {
    res.send('This route is for Admins only');
});

module.exports = router;

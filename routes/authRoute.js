const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc Auth with Google
// @route GET /auth/google
router.get(
  '/google',
  passport.authenticate(
    'google',
    {
      // this scope info is from http://www.passportjs.org/packages/passport-google-oauth20/
      scope: ['profile']
    }
  )
);



// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate(
    'google',
    {
      failureRedirect: '/'
    }
  ),
  ( req, res ) => {
    res.redirect(
      '/dashboard',
    );
  }
);


// @desc Logout user
// @route GET /auth/logout
router.get(
  '/logout',
  ( req, res ) => {
    req.logOut();
    res.redirect('/');
  }
);


module.exports = router
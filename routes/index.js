const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/authMiddleware'); 

const Story = require('../models/Story');

// @desc Login/Landing Page
// @route GET /
router.get(
  '/',
  ensureGuest,
  ( req, res ) => {
    res.render(
      'login',
      {layout: 'login'}
    );
  }
);



// @desc Dashboard
// @route GET /dashboard
router.get(
  '/dashboard',
  ensureAuth,
  async ( req, res ) => {
    try {
      console.log(req.user);
      const stories = await Story.find({
        user: req.user.id
      })
        .lean()  // lean here provides this stories data to be plain Javascript object,  NOT MongooseDocument
        res.render(
          'dashboard',
          {
            name: req.user.firstName,
            stories
          }
        );
    } catch (err) {
      console.error(err);
      res.render('error/500');
    }
  }
);





module.exports = router
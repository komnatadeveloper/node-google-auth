const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');


module.exports = function (passport) {
  passport.use(
    new GoogleStrategy( 
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
      },
      async ( accessToken, refreshToken, profile, done ) => {
        // done: callback function here
        // console.log(profile);
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }

        try {
          let user = await User.findOne({
            googleId: profile.id
          });

          if( user ) {
            done(
              null, // null is Error so if null -> it means no error
              user
            ); 
          } else {
            user = await User.create(newUser);
            done(
              null, // null is Error so if null -> it means no error
              user
            );
          }
        } catch (err) {
          console.error(err);
        }

      }

    )
  );

  // Copy paste from http://www.passportjs.org/docs/configure/ -> Sessions Title
  passport.serializeUser(
    (user, done) => {
      done(null, user.id);
    }
  );
  
  passport.deserializeUser(
    (id, done) => {
      User.findById(
        id, 
        (err, user) => done(err, user)
      );
    }
  );
  // End of Copy paste from http://www.passportjs.org/docs/configure/ -> Sessions Title
}
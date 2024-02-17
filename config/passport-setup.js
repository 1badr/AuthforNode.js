const passport = require('passport');
const GooglePassport = require('passport-google-oauth20');
const keys = require('./Keys')
const googleUser = require('../models/google')

passport.serializeUser((user,done)=> {
    done(null,user.id)
}) 


passport.deserializeUser((id,done)=> {
    googleUser.findById(id).then((user)=>{
        done(null,user)
    })
    done(null,user.id)
}) 
passport.use(
    new GooglePassport(
      {
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        client_secret: keys.google.client_secret
      },
      (accessToken, refreshToken, profile, done) => {
        googleUser.findOne({ googleId: profile.id }).then((currentGoogleUser) => {
          if (currentGoogleUser) {
            done(null, currentGoogleUser);
          } else {
            new googleUser({
              username: profile.displayName,
              googleId: profile.id
            })
              .save()
              .then((newGoogleUser) => {
                console.log(newGoogleUser);
                done(null, newGoogleUser);
              });
          }
        });
      }
    )
  );
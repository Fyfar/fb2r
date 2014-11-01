
var passport = require('passport'),
  DropboxStrategy = require('passport-dropbox-oauth2').Strategy,
  VkontakteStrategy = require('passport-vkontakte'),
  FacebookStrategy = require('passport-facebook'),
  GooglePlusStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');
var User = require('../models/user').User;

passport.use('dropbox', new DropboxStrategy({
  clientID: config.get('dropbox:clientID'),
  clientSecret: config.get('dropbox:clientSecret'),
  callbackURL: config.get('dropbox:callbackURL')
}, function (accessToken, refreshToken, profile, done) {
  console.log(accessToken);
  User.findOne({id: profile.id}, function (err, user) {
    if (!err) {
      if (!user) {
        console.log("Created user...");
        user = new User(profile);
        user.accessToken = accessToken;
        user.save(function (err) {
          return done(null, user);
        });
      } else {
        console.log("User found...return");
        return done(null, user);
      }
    } else {
      return done(err);
    }
  })
}));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) done(err);

        done(null, user);
    });
});

module.exports = function (app) {
};

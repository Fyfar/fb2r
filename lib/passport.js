/*jshint node:true */
'use strict';
var passport = require('passport'),
  DropboxStrategy = require('passport-dropbox-oauth2').Strategy,
  VkontakteStrategy = require('passport-vkontakte').Strategy,
  FacebookStrategy = require('passport-facebook'),
  GooglePlusStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');
var User = require('../models/user').User;
var md5 = require('MD5');

/**
 * Get or create user from mongoDB
 * @param  {string}   accessToken
 * @param  {string}   refreshToken
 * @param  {json object}   profile
 * @param  {Function} done
 * @return {Function}
 */
var getOrCreateUser = function(accessToken, refreshToken, profile, done) {
  User.findOne({id: profile.id}, function (err, user) {
    if (!err) {
      if (!user) {
        console.log('Created user...');
        user = new User();
        user.id = profile.id;
        user.displayName = profile.displayName;
        user.username = profile.username;
        user.profileUrl = profile.profileUrl;
        user.email = profile.emails[0].value || '';
        user.hashedEmail = md5(profile.emails[0].value) || '';
        user.provider.push({
          name: profile.provider,
          accessToken: accessToken,
          refreshToken: refreshToken || ''
        });
        user.save(function (err) {
          if (!err) {
            console.log('All is OK!');
            return done(null, user);
          }
        });
      } else {
        console.log('User found...return');
        return done(null, user);
      }
    } else {
      return done(err);
    }
  });
};

passport.use('dropbox', new DropboxStrategy({
  clientID: config.get('dropbox:clientID'),
  clientSecret: config.get('dropbox:clientSecret'),
  callbackURL: config.get('dropbox:callbackURL')
}, function (accessToken, refreshToken, profile, done) {
  getOrCreateUser(accessToken, refreshToken, profile, done);
}));

passport.use('vk', new VkontakteStrategy({
  clientID: config.get('vkontakte:clientID'),
  clientSecret: config.get('vkontakte:clientSecret'),
  callbackURL: config.get('vkontakte:callbackURL')
}, function (accessToken, refreshToken, profile, done) {
  getOrCreateUser(accessToken, refreshToken, profile, done);
}));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
          done(err);
        }

        done(null, user);
    });
});

module.exports = function (app) {};

/*jshint node:true */
'use strict';
var HttpError = require('../error').HttpError;
var passport = require('passport');

module.exports = function (app) {
  app.get('/', require('./frontpage').get);
  app.get('/signup', require('./login').signup);
  app.get('/login', require('./login').login);

  // Auth block
  app.get('/auth/dropbox', passport.authenticate('dropbox'));
  app.get('/auth/dropbox/callback',
    passport.authenticate('dropbox', {successRedirect: '/'}));
  app.get('/auth/vk', passport.authenticate('vk'));
  app.get('/auth/vk/callback',
    passport.authenticate('vk', {successRedirect: '/'}));
  // End auth block

  // Start dropbox api block
  app.get('/dropbox', require('./dropbox').getAllUsers);
  app.post('/dropbox', require('./dropbox').post);
  app.route('/dropbox/:hash')
  .get(require('./dropbox').get)
  .post(require('./dropbox').post)
  .put(require('./dropbox').put)
  .delete(require('./dropbox').delete);
  app.get('/dropbox/:userToken?path=:book', require('./dropbox').getBook);
  // End dropbox api block
  app.post('/dropbox/bookmark/:hash', require('./bookmarks').post);
  app.get('/dropbox/bookmark/:hash', require('./bookmarks').get);

  app.get('*', function (req, res, next) {
    next(new HttpError(404, 'Page not found!'));
  });
};

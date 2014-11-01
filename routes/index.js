var passport = require('passport');
var HttpError = require('../error').HttpError;

module.exports = function (app) {
  app.get('/', require('./frontpage').get);
  app.get('/error', require('./error').get);
  // Auth block
  app.get('/auth/dropbox', passport.authenticate('dropbox'));
  app.get('/auth/dropbox/callback', passport.authenticate('dropbox', {successRedirect: '/'}));
  // End auth block
  app.get('*', function (req, res, next) {
    next(new HttpError(404, 'Page not found!'));
  })
};

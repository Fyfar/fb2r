var passport = require('passport');
var HttpError = require('../error').HttpError;

module.exports = function (app) {
  app.get('/', require('./frontpage').get);
  app.get('/error', require('./error').get);

  // Auth block
  app.get('/auth/dropbox', passport.authenticate('dropbox'));
  app.get('/auth/dropbox/callback', passport.authenticate('dropbox', {successRedirect: '/'}));
  // End auth block

  // Start dropbox api block
  app.get('/dropbox', require('./dropbox').getAllUsers);
  app.route('/dropbox/:user_token')
  .get(require('./dropbox').get)
  .post(require('./dropbox').post)
  .put(require('./dropbox').put)
  .delete(require('./dropbox').delete);
  //app.get('/dropbox/:user_token?path=:book', require('./dropbox').getBook);
  // End dropbox api block

  //API
  app.get('/api/:user_token', require('./api').get);

  app.get('*', function (req, res, next) {
    next(new HttpError(404, 'Page not found!'));
  })
};

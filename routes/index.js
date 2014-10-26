var HttpError = require('../error').HttpError;

module.exports = function (app) {
  app.get('/', require('./frontpage').get);
  app.get('/error', require('./error').get);
  app.get('*', function (req, res, next) {
    next(new HttpError(404, 'Page not found!'));
  })
};

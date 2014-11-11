/*jshint node:true */
'use strict';
var passport = require('passport');

exports.authenticate = function(req, res, next) {
  passport.authenticate(req.params.provider);
};
exports.callback = function(req, res, next) {
  passport.authenticate(req.params.provider, {successRedirect: '/'});
};
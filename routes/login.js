/*jshint node:true */
'use strict';
exports.signup = function(req, res, next) {
  res.render('signup');
};
exports.login = function(req, res, next) {
  res.render('login');
};
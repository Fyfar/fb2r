/*jshint node:true */
'use strict';
var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;
var md5 = require('MD5');

var schemaUser = new Schema({
  id: Number,
  displayName: String,
  username: String,
  profileUrl: String,
  photos: [{
    value: String
  }],
  emails: [{
    value: String
  }],
  provider: [{
    name: String,
    accessToken: String,
    refreshToken: String
  }],
  userToken: String
});

schemaUser.methods.encryptToken = function(emails, id) {
  return md5(emails + id);
};

exports.User = mongoose.model('User', schemaUser);

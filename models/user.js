/*jshint node:true */
'use strict';
var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;

var schemaUser = new Schema({
  id: Number,
  displayName: String,
  username: String,
  profileUrl: String,
  photos: [{
    value: String
  }],
  email: String,
  hashedEmail: String,
  provider: [{
    name: String,
    accessToken: String,
    refreshToken: String
  }],
  bookmarks: [{
    bookName:String,
    lastChar: Number,
    pageNumber: Number,
    name: String,
    text: String
  }],
  books: [{
    name: String,
    lastChar: Number,
    updated: Date
  }]
});

exports.User = mongoose.model('User', schemaUser);

/*jshint node:true */
'use strict';
var mongoose = require('mongoose');

var mongoUri = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
  process.env.OPENSHIFT_MONGODB_DB_HOST;

mongoose.connect(mongoUri);

module.exports = mongoose;

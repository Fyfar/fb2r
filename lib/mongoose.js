/*jshint node:true */
'use strict';
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.get('mongoose:uri:openshift'));

module.exports = mongoose;

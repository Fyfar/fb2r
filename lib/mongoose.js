var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect('localhost', 'fb2r');

module.exports = mongoose;
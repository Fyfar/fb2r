var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.get('mongoose:uri:local'), config.get('mongoose:options'));

module.exports = mongoose;
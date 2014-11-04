var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;

var schemaUser = new Schema({
  id: Number,
  displayName: String,
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

exports.User = mongoose.model('User', schemaUser);
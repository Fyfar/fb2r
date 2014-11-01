var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;

var schemaUser = new Schema({
  profider: String,
  id: Number,
  displayName: String,
  emails: [
    value: String
  ],
  accessToken: String
});

exports.User = mongoose.model('User', schemaUser);
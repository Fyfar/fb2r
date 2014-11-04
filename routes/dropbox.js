var https = require('https');
var User = require('../models/user').User;

exports.get = function(req, res, next) {
  User.findOne({id: req.params.user_token}, function(err, user) {
    if (!err) {
      if (user) {
        var path = req.query.path;
        var token = user.provider[0].accessToken;
        var url;
        if (path) {
          url = 'https://api-content.dropbox.com/1/files/auto/' + path;
        } else {
          url = 'https://api.dropbox.com/1/metadata/auto//';
        }
        https.get(url + '?access_token=' + token, function(response) {
          response.on('data', function(chunk) {
            res.write(chunk);
          })
          response.on('end', function() {
            res.end();
          })
        });
      } else {
        next(new Error(500, 'User not found'));
      }
    } else {
      next(500);
    }
  });
};
exports.getAllUsers = function(req, res, next) {
  User.find({}, function(err, users) {
    if (!err) {
      res.json(users);
    } else {
      next(500);
    }
  });
};
exports.getBook = function(req, res, next) {
  User.findOne({id: req.params.user_token}, function(err, user) {
    if (!err) {
      if (user) {
        var path = req.query.path;
        var token = user.provider[0].accessToken;
        https.get('https://api.dropbox.com/1/files/auto//' +
          path + '?access_token=' + token, function(response) {
          response.on('data', function(data) {
            res.json(JSON.parse(data));
          })
        });
      } else {
        next(new Error(500, 'User not found'));
      }
    } else {
      next(500);
    }
  });
};
exports.post = function(req, res, next) {
  console.log("This is post request!");
  res.json("This is post request!");
};
exports.put = function(req, res, next) {
  console.log("This is put request!");
  res.json("This is put request!");
};
exports.delete = function(req, res, next) {
  console.log("This is delete request!");
  res.json("This is delete request!");
};
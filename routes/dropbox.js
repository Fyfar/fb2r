/*jshint node:true */
'use strict';
var https = require('https');
var User = require('../models/user').User;

exports.get = function(req, res, next) {
  User.findOne({hashedEmail: req.params.hash}, function(err, user) {
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
          });
          response.on('end', function() {
            res.end();
          });
        });
      } else {
        next(404);
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
  User.findOne({id: req.params.userToken}, function(err, user) {
    if (!err) {
      if (user) {
        var path = req.query.path;
        var token = user.provider[0].accessToken;
        https.get('https://api.dropbox.com/1/files/auto//' +
          path + '?access_token=' + token, function(response) {
          response.on('data', function(data) {
            res.json(JSON.parse(data));
          });
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
  User.findOne({hashedEmail: req.params.hash}, function(err, user) {
    if (!err) {
      if (user) {
        var flag = false;
        var bookName = req.param('bookName');
        if (user.books.length !== 0) {
          for (var i = 0; i < user.books.length; i++) {
            if (user.books[i].name === bookName) {
              flag = true;
              break;
            }
          }

          if (flag) {
              if (req.param('lastChar') > user.books[i].lastChar) {
                user.books[i].lastChar = req.param('lastChar');
                user.books[i].updated = Date.now();
                user.save();
                res.json({'status': 'updated'});
              } else if (req.param('lastChar') == user.books[i].lastChar) {
                res.json({'status': 'equals'});
              } else {
                res.json(JSON.parse(JSON.stringify(user)));
              }
            } else {
              console.log('Add new book ' + bookName);
              user.books.push({
                name: bookName,
                lastChar: req.param('lastChar'),
                updated: Date.now()
              });
              user.save();
              res.json({'status': 'add new book with flag'});
            }
          } else {
            user.books.push({
              name: bookName,
              lastChar: req.param('lastChar'),
              updated: Date.now()
            });
            user.save();
            res.json({'status': 'add new book'});
        }
      } else {
        next(404);
      }
    }
  });
};
exports.put = function(req, res, next) {
  console.log('This is put request!');
  res.json('This is put request!');
};
exports.delete = function(req, res, next) {
  console.log('This is delete request!');
  res.json('This is delete request!');
};

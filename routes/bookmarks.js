/*jshint node:true */
'use strict';

var User = require('../models/user').User;

exports.get = function(req, res, next) {
  User.findOne({hashedEmail: req.params.hash}, function(err, user) {
    if (!err) {
      if (user) {
        res.json(JSON.parse(JSON.stringify(user)));
      }
    }
    next(404);
  });
};

exports.post = function(req, res, next) {
  User.findOne({hashedEmail: req.params.hash}, function(err, user) {
    if (!err) {
      if (user) {
        var flag = false;
        var bookmarkName = req.param('bookmarkName');
        if (user.bookmarks.length !== 0) {
          for (var i = 0; i < user.bookmarks.length; i++) {
            if (user.bookmarks[i].name === bookmarkName) {
              flag = true;
              break;
            }
          }

          if (flag) {
              if (req.param('lastChar') > user.bookmarks[i].lastChar) {
                user.bookmarks[i].lastChar = req.param('lastChar');
                user.bookmarks[i].bookName = req.param('bookName');
                user.bookmarks[i].pageNumber = req.param('pageNumber');
                user.bookmarks[i].name = req.param('bookmarkName');
                user.bookmarks[i].text = req.param('text');
                user.save();
                res.json({'status': 'updated'});
              } else if (req.param('lastChar') == user.bookmarks[i].lastChar) {
                res.json({'status': 'equals'});
              } else {
                res.json(JSON.parse(JSON.stringify(user)));
              }
            } else {
              console.log(req.param('text'));
              user.bookmarks.push({
                pageNumber: req.param('pageNumber'),
                bookName: req.param('bookName'),
                lastChar: req.param('lastChar'),
                name: bookmarkName,
                text: req.param('text')
              });
              user.save();
              res.json({'status': 'add new book with flag'});
            }
          } else {
            user.bookmarks.push({
                pageNumber: req.param('pageNumber'),
                bookName: req.param('bookName'),
                lastChar: req.param('lastChar'),
                name: bookmarkName,
                text: req.param('text')
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
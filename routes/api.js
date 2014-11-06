var User = require('../models/user').User;
var dropbox = require('./dropbox');

exports.get = function(req, res, next) {
    User.findOne({userToken: req.params.user_token}, function(err, user) {
        if(!user) {
            next(new Error(404, 'User not found'));
        } else {
            //res.json(user);
            dropbox.get(req, res, next);
        }

    });
};
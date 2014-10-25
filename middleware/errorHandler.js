/**
 * Created by Fyfar on 25.10.2014.
 */
var HttpError = require('../error').HttpError,
    config = require('../config'),
    errorHandler = require('errorhandler');


function sendHttpError(error, res) {
    res.status(error.status);

    if (res.xhr) {
        res.json(error);
    } else {
        res.render('error', {error: error});
    }
}

function ErrorHandler(app) {
    return function (err, req, res, next) {
        if (typeof err === 'number') {
            err = new HttpError(err);
        }

        if (!err) {
            next();
        } else if (err instanceof HttpError) {
            sendHttpError(err, res);
        } else {
            if (config.get('env') === 'dev' || app.get('env') === 'dev') {
                errorHandler()(err, req, res, next);
            } else {
                err = new HttpError(500);
                sendHttpError(err, res)
            }
        }
    }
}

module.exports = ErrorHandler;
/**
 * Created by Fyfar on 25.10.2014.
 */
/*jshint node:true */
'use strict';
var util = require('util'),
    http = require('http');


function HttpError(status, message) {
    Error.apply(this, arguments);

    this.status = status;
    this.message = message || http.statusCode || 'Unknown Http Error';
}

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';
exports.HttpError = HttpError;
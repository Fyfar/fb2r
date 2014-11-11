/**
 * Created by Fyfar on 25.10.2014.
 */
/*jshint node:true */
'use strict';
var nconf = require('nconf'),
    path = require('path');

nconf.argv()
    .env()
    .file(path.join(__dirname, 'config.json'));

module.exports = nconf;
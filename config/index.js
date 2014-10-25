/**
 * Created by Fyfar on 25.10.2014.
 */
var nconf = require('nconf'),
    path = require('path');

nconf.argv()
    .env()
    .file(path.join(__dirname, 'config.json'));

module.exports = nconf;
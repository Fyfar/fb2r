var express = require('express');

var app = express();

var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('./middleware/errorHandler')(app);

var passport = require('passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view options', {layout: false});
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

require('./lib/passport')(app);

app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app);
app.use(errorHandler);

module.exports = app;

if (!process.env.PORT) {
  require('dotenv').config()
  process.env.NODE_ENV = "dev"
}

const express = require('express');
// path provides utilities for working with file and directory paths
const path = require('path');
// favicon is a visual cue that client software, like browsers, use to identify a site
const favicon = require('serve-favicon');
// logger middleware
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/petes-pets');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//returns middleware that only parses urlencoded bodies and only looks at requests where the content-type header matches the type option
app.use(bodyParser.urlencoded({ extended: false }));
//returns middleware that only parses json and looks at requests.... (see above)
app.use(bodyParser.json());
app.use(cookieParser());
//specifies root directory from which to serve static assests (in this case the images?)
app.use(express.static(path.join(__dirname, 'public')));

app.locals.PUBLIC_STRIPE_API_KEY = process.env.PUBLIC_STRIPE_API_KEY

require('./routes/index.js')(app);
require('./routes/pets.js')(app);

// catch 404 and forward to error handler
// middleware function that is executed everytime the app receives a request
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

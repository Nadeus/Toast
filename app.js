var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messageRouter = require('./routes/message');
var connexionRouter = require('./routes/connexion');
var deconnexionRouter = require('./routes/deconnexion');
var inscriptionRouter = require('./routes/inscription');

var app = express();

// Moteur de templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'zgkuzfiugezjiruevujzg',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(require("./middlewares/flash"))

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/message', messageRouter);
app.use('/connexion', connexionRouter);
app.use('/deconnexion', deconnexionRouter);
app.use('/inscription', inscriptionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

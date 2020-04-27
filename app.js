var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var auth = require('./lib/auth');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var db = require('./lib/db');

var app = express();

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rhgkdms99**',
    database: 'anynote'
};
var sessionStore = new MySQLStore(options);
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

var passport = require('./lib/passport')(app)

var indexRouter = require('./routes/index');
var signRouter = require('./routes/sign')(passport);
var modifyRouter = require('./routes/modify');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(request, response, next){
  request.Auth = auth.check(request, response);
  next();
})
app.use('/', indexRouter);
app.use('/sign', signRouter);
app.use('/modify', modifyRouter);

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

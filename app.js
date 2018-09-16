var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const json2xls = require('json2xls');
var index = require('./routes/index');
var users = require('./routes/users');
var hbs = require('hbs');
var session = require('express-session')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerHelper('tambahSatu', function (angka) {
  return angka + 1
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(json2xls.middleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap3/dist'));
app.use('/gentelella', express.static(__dirname + '/node_modules/gentelella'));


var pengamananCookies = function (req, res, next) {
  console.log(req.cookies);
  if (req.cookies.username) 
      return next();

  res.redirect('/login')
};


  app.use(function(req, res, next){
    res.locals.user = req.cookies.username;

    next();
  });




app.use('/', index);
app.use('/users', pengamananCookies , users);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});





// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
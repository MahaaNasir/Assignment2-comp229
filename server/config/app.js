let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// here are modules for authentication 
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// setting up database 
let mongoose = require('mongoose');
let DB = require('./db');

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactsRouter = require('../routes/contacts');

// pointing the mongoose to the DB URI here
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
})

let app = express();

// now view the engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// setting up the express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initializing flash
app.use(flash());

// initializing passport
app.use(passport.initialize());
app.use(passport.session());

// passport user configuration

//here we are creating a User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

// implementing the User Authentication Strategy
passport.use(User.createStrategy());

// serializing and deserializing the User Informarion
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts-list', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // setting locals.
  // only providing error in the development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error'});
});

module.exports = app;
const path = require('path');
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const debug = require('debug')('robust-scalable-blog-application:app');

const { default: mongoose } = require('mongoose');
const config = require('./config');
const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');

const env = process.env.NODE_ENV || 'development';
const configOptions = config[env];

mongoose.connect(configOptions.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  debug('MongoDB Connected');
}).catch((e) => {
  debug(e);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
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

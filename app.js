const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
//dotenv
require('dotenv').config()

const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const commentsRouter = require('./routes/comments');
const likesRouter = require('./routes/likes');
const hashtagsRouter = require('./routes/hashtags');
const app = express();

//db
const db = require('./config/db')();

app.use(cors());

 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));

//Routers
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/comments', commentsRouter);
app.use('/likes', likesRouter);
app.use('/hashtags', hashtagsRouter);

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
  res.json({
		message:err.message,
		error:err
	});
});

module.exports = app;

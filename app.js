var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createProduct = require('./routes/createProduct')
//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var payment = require('./routes/payments')
const cors = require("cors");
var app = express();

// view engine setup
if (process.env.NODE_ENV=="production"){
  const path = require('path')

  app.get('/',(req,res)=>{
    app.use(express.static(path.resolve(__dirname,'client','build')))
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}
  
  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
 app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', payment)
app.use('/', createProduct);


if (process.env.Mode_Env = "production") {
  app.use(express.static("client/build"));
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });

}


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

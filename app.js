
var express = require('express');
var app = express();
//var path = require('path');
//var logger = require('morgan');
var createProduct = require('./routes/createProduct')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var payment = require('./routes/payments')
const cors = require("cors");



require('./routes/dbConn.js/conn')

    app.use(cors({origin:"*"}))


    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Headers", "*");
      res.header('Access-Control-Allow-Credentials', false);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      next()
    })
    
    app.get('/test/list',(req,res)=>{
      res.send('hello')
    })
    app.use('/', indexRouter);
    app.use('/', usersRouter);
    app.use('/', payment)
    app.use('/', createProduct);
    
    
    app.listen( 5000, (err,d)=>{
      if(err) console.log(err)
      console.log(`server is running in port ${500}`)
    })



  module.exports = app;

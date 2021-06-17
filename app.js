var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var config=require('./backend/congig/config');
var MongoStore = require('connect-mongo');
const mongoose=require('mongoose');
const dbconnect=require('./backend/libs/dbconnect')
dbconnect.connect;



const userscreating=require('./backend/libs/bootstrapinglib');
const kiranaregister=require('./backend/libs/kiranaregisterlib');
const oliginlib=require('./backend/libs/ologinlib');



userscreating.createUsers()




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session( 
    {resave:false, 
    saveUninitialized:false, 
    secret:config.session_secret,
    store: MongoStore.create({ mongoUrl: config.connectionstring })

}))
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

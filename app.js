var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
var app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/post.route');

const cors = require('cors');
app.use(cors({
  origin : "*"
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

mongoose.connect(process.env.DB_URL).then(() =>{
  console.log("Connected to database successfully");
}).catch(err =>{
  console.log(err.message);
})
app.use('/' , routes);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/' , (req , res) =>{
  res.send("Working")
})

module.exports = app;

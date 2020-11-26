
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();


// Route Import
const commonRoute = require('./Routes/commonRoute');
const redirectRoute = require('./Routes/redirectRoute');

// db import
const {getDbConnection} = require('./DB/DatabaseConnection'); 

// CORS Request
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    next();
}
app.use(allowCrossDomain);

// get db connection
getDbConnection();
app.use(express.json());

app.use('/links',commonRoute);
app.use('/',redirectRoute);

module.exports = app;
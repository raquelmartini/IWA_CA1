
/**
 * Contains code to load all requirements, map base URL path to the correct router, connect to the database, and listen for incoming REST requests
 * 
 * @author RMR
 * @version 1.0
 * @see db, .env, entree-routes
 * @tutorial https://www.youtube.com/watch?v=vjf774RKrLc - used this tutorial to learn how to add routes [Accessed: 22/4/20]
 */

 //adds support for env files
const dotenv = require('dotenv');
dotenv.config();

const logger = require("morgan");
const cors = require("cors");
const http = require("http");
const express = require("express");

//rate limit for users
const rateLimit = require('express-rate-limit');

//data sanitization for XSS prevention
const xss = require('xss-clean');

//sanitize data sanitization for mongo
const mongoSanitize = require('express-mongo-sanitize');

const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const db = require('./controllers/db');

const app = express();

//prevents DOS attacks by limiting the size of the body payload - see https://itnext.io/make-security-on-your-nodejs-api-the-priority-50da8dc71d68
app.use(express.json({limit: '100kb'}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//map the url path for entree
const entree = require('./routes/entree-routes'); 
//map URL path to the router
app.use('/entrees', entree);

//limit number of calls to the API for a user - see https://blog.logrocket.com/rate-limiting-node-js/
const limit = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
    max: 100,
    message: 'You have exceeded the 100 requests in 24 hrs limit!', 
    headers: true
});
app.use('/entrees', limit);

//data sanitization to prevent XSS attacks - see https://blog.logrocket.com/rate-limiting-node-js/
app.use(xss());

//sanitize data sanitization for mongo
app.use(mongoSanitize());

//start the server listening and connect to the mongo DB
db.connect((err) => {
    if (err) {
        console.log('unable to connect to database');
        process.exit();
    } else {
        app.listen(process.env.SERVER_PORT, () => {
            console.log('connected and listening on port ' + process.env.SERVER_PORT);
        });
    }
});

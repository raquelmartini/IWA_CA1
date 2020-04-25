
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
const express = require("express");
const http = require('http');
const path = require('path');

//rate limit for users
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require("body-parser");

const router = express();
router.use(express.static(path.resolve(__dirname, 'views'))); //We define the views folder as the one where all static content will be served
router.use(express.urlencoded({extended: true})); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
router.use(express.json()); //We include support for JSON that is coming from the client
router.use(logger('dev'));

//map the url path for entree
const entree = require('./routes/entree-routes'); 
//map URL path to the router
router.use('/', entree);

//start the server listening and connect to the mongo DB
const server = http.createServer(router); //This is where our server gets created
const db = require('./controllers/db');

db.connect((err) => {
    if (err) {
        console.log('unable to connect to database');
        process.exit();
    } else {
        server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
            console.log('connected and listening on port ' + process.env.SERVER_PORT);
        });
    }
});

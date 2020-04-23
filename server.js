
/**
 * Contains code to load all requirements, map base URL path to the correct router, connect to the database, and listen for incoming REST requests
 * 
 * @author RMR
 * @version 1.0
 * @see db, .env, entree-routes
 * @tutorial https://www.youtube.com/watch?v=vjf774RKrLc - used this tutorial to learn how to add routes [Accessed: 22/4/20]
 */

const dotenv = require('dotenv');
dotenv.config();

const logger = require("morgan");
const cors = require("cors");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const db = require('./controllers/db');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//map the url path for entree
const entree = require('./routes/entree-routes'); 
app.use('/entrees', entree);

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

const logger = require("morgan");
const cors = require("cors");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require( 'mongoose');

var entreeCtrl = require('./entree-controller');
const db = require("./db");

const collection = "todo";
const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(require('./routes'));

//app.get('/entrees', entreeCtrl.createEntree);

//start the server listening and connect to the mongo DB
db.connect((err)=>{
    if(err){
        console.log('unable to connect to database');
        process.exit();
    }
    else{
        app.listen(port,()=>{
            console.log('connected and listening on port ' + port);
        });
    }
});

//create
app.post('/',(req,res,next)=>{
    // Document to be inserted
    const userInput = req.body;

    db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
        if(err){
            const error = new Error("Failed to insert Todo Document");
             error.status = 400;
            next(error);
        }
        else
             res.json({result : result, document : result.ops[0],msg : "Successfully inserted Todo!!!",error : null});
    });
});

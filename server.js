const dotenv = require('dotenv');
dotenv.config();

const logger = require("morgan");
const cors = require("cors");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const db = require("./controllers/dbntrollers/dbntrollers/dbntrollers/dbntrollers/db");
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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

/*

//get
app.get('/getEntrees', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if (err) {
            const error = new Error("Failed to get record");
            error.status = 400;
            next(error);
        } else {
            res.json(documents);
        }
    });
});

//insert
app.post('/', (req, res, next) => {
    // Document to be inserted
    const userInput = new Entree(req.body);
    db.getDB().collection(collection).insertOne(userInput, (err, result) => {
        if (err) {
            const error = new Error("Failed to insert record");
            error.status = 400;
            next(error);
        } else
            res.json({
                result: result,
                document: result.ops[0],
                msg: "Successfully inserted record!",
                error: null
            });
    });
});

//update
app.put('/:id', (req, res) => {

    const entreeID = req.params.id;

    db.getDB().collection(collection).findOneAndUpdate({_id: db.getPrimaryKey(entreeID)}, {
        $set: {
            name: req.params.name,
            section: req.params.section,
            price: req.params.price,
            vegetarian: req.params.vegetarian,
            vegan: req.params.vegan
        }
    }, {
        returnOriginal: false
    }, (err, result) => {
        if (err) {
            const error = new Error("Failed to update record");
            error.status = 400;
            next(error);
        } else {
            res.json(result);
        }
    });
});

//delete
app.delete('/:id',(req,res)=>{
    const entreeID = req.params.id;
    db.getDB().collection(collection).findOneAndDelete({_id : db.getPrimaryKey(entreeID)},(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    });
});
*/
const db = require("../db");
const Entree = require('../models/entree');

//test route and controller
exports.test = function (req, res) {
    res.send('Get request was routed to test!'); 
};

//create
exports.createEntree = function (req, res) {
    let newEntree = new Entree(
        {
            name: req.body.name,
            section: req.body.section,
            price: req.body.price,
            vegetarian: req.body.vegetarian,
            vegan: req.body.vegan
        }
    );

    db.getDB().collection("entrees").insertOne(newEntree, (err, result) => {
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
};

//retrieve all
exports.retrieveAll = function(req,res){
    // get all Todo documents within our todo collection
    // send back to user as json
    db.getDB().collection("entrees").find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
};

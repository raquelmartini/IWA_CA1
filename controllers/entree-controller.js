const db = require("../db");
const Entree = require('../models/entree');


//create one
exports.createOne = function (req, res) {
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
    
}

//read all
exports.readAll = function(req,res){
    // get all Todo documents within our todo collection
    // send back to user as json
    db.getDB().collection("entrees").find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
}

//update one
exports.updateOne = function(req,res){
    const id = req.params.id;
    db.getDB().collection("entrees").findOneAndUpdate({_id : db.getPrimaryKey(id)},
    {$set : {
            name: req.body.name,
            section: req.body.section,
            price: req.body.price,
            vegetarian: req.body.vegetarian,
            vegan: req.body.vegan
    }},{returnOriginal : false},(err,result)=>{
        if(err)
            console.log(err);
        else{
            res.json(result);
        }      
    });
}

//delete one
exports.deleteOne = function(req,res){   
    const id = req.params.id;
    db.getDB().collection("entrees").findOneAndDelete({_id : db.getPrimaryKey(id)},(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    });
}

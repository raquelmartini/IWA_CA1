
/*
* Learned about using a controller from these YouTube videos
* https://www.youtube.com/watch?v=vjf774RKrLc 
* https://www.youtube.com/watch?v=CyTWPr_WwdI 
* Accessed: 22/4/20
*/

const db = require('./db');
const Entree = require('../models/entree');

//create one
exports.createOne = function (req, res) {
    let newEntree = new Entree(
        {
            name: req.body.name,
            section: req.body.section,
            price: req.body.price,
            vegetarian: req.body.vegetarian,
            vegan: req.body.vegan,
            createdby: req.body.createdby
        }
    );

    db.getDB().collection(process.env.DB_COLLECTION).insertOne(newEntree, (err, result) => {
        if (err) {
            const error = new Error("Failed to insert record");
            error.status = 400;
            next(error);
        } else
            res.json(newEntree);
    });
    
}

//read all
exports.readAll = function(req,res){
    db.getDB().collection(process.env.DB_COLLECTION).find({}).toArray((err,documents)=>{
        if (err) {
            const error = new Error("Failed to read all records");
            error.status = 400;
            next(error);
        } else{
            res.json(documents);
        }
    });
}

//read one
exports.readOne = function(req,res){
    const id = req.params.id;
    db.getDB().collection(process.env.DB_COLLECTION).find({_id : db.getPrimaryKey(id)}).toArray((err,documents)=>{
        if (err) {
            const error = new Error("Failed to read all records");
            error.status = 400;
            next(error);
        } else{
            res.json(documents);
        }
    });
}

//update one
exports.updateOne = function(req,res){
    const id = req.params.id;
    db.getDB().collection(process.env.DB_COLLECTION).findOneAndUpdate({_id : db.getPrimaryKey(id)},
    {$set : {
            name: req.body.name,
            section: req.body.section,
            price: req.body.price,
            vegetarian: req.body.vegetarian,
            vegan: req.body.vegan,
            createdby: req.body.createdby
    }},{returnOriginal : false},(err,result)=>{
        if (err) {
            const error = new Error("Failed to update a record");
            error.status = 400;
            next(error);
        } else{
            res.json(result);
        }      
    });
}

//delete one
exports.deleteOne = function(req,res){   
    const id = req.params.id;
    db.getDB().collection(process.env.DB_COLLECTION).findOneAndDelete({_id : db.getPrimaryKey(id)},(err,result)=>{
        if (err) {
            const error = new Error("Failed to delete a record");
            error.status = 400;
            next(error);
        } else
            res.json(result);
    });
}

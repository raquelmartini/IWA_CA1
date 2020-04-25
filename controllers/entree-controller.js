/**
 * Contains route request handlers for the application
 * 
 * @author RMR
 * @version 1.0
 * @see entree-routes
 * @tutorial https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb - used this tutorial to learn how to add routes [Accessed: 22/4/20]
 */

const fs = require('fs');
const xmlParse = require('xslt-processor').xmlParse;
const xsltProcess = require('xslt-processor').xsltProcess;
const xml2js = require('xml2js');
const db = require('./db');
const Entree = require('../models/entree');

/**
 * Inserts a single Entree into the DB connected to in db
 * 
 * @param req HTTP request body
 * @param res HTTP response body 
 * @returns Entree object or Error
 * @todo Add check to see if the record already exists in the DB
 */
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

    console.log("Body: " + req.body.name);
    // console.log("Body: " + JSON.stringify(req.body));

    db.getDB().collection(process.env.DB_COLLECTION).insertOne(newEntree, (err, result) => {
        if (err) {
            const error = new Error("Failed to insert record");
            error.status = 400;
            next(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        }
    });
}

// exports.createOne = function (req, res) {
//     let newEntree = new Entree(
//         {
//             name: req.body.name,
//             section: req.body.section,
//             price: req.body.price,
//             vegetarian: req.body.vegetarian,
//             vegan: req.body.vegan,
//             createdby: req.body.createdby
//         }
//     );

//     db.getDB().collection(process.env.DB_COLLECTION).insertOne(newEntree, (err, result) => {
//         if (err) {
//             const error = new Error("Failed to insert record");
//             error.status = 400;
//             next(error);
//         } else
//             res.json(newEntree);
//     });
// }


/**
 * Reads and returns all the collection as an array of JSON objects
 * 
 * @param req HTTP request body
 * @param res HTTP response body 
 * @returns Array of newly Entree objects or Error
 */
exports.readAll = function (req, res) {
    db.getDB().collection(process.env.DB_COLLECTION).find({})
    .sort( { "section": 1, "name": 1 } )
    .toArray((err, documents) => {
        if (err) {
            const error = new Error("Failed to read all records");
            error.status = 400;
            next(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.json(documents);
        }
    });
}

/**
 * Reads first JSON object in the collection with the ID specified in request URL path
 * 
 * @param req HTTP request body
 * @param res HTTP response body 
 * @returns Entree object or Error
 */
exports.readOne = function (req, res) {
    const id = req.params.id;
    db.getDB().collection(process.env.DB_COLLECTION).find({ _id: db.getPrimaryKey(id) }).toArray((err, documents) => {
        if (err) {
            const error = new Error("Failed to read all records");
            error.status = 400;
            next(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.json(documents);
        }
    });
}

/**
 * Updates and returns the (newly updated) first JSON object in the collection matching the ID specified in request URL path
 * 
 * @param req HTTP request body
 * @param res HTTP response body 
 * @returns Entree object or Error
 */
exports.updateOne = function (req, res) {
    const id = req.params.id;
    db.getDB().collection(process.env.DB_COLLECTION).findOneAndUpdate({ _id: db.getPrimaryKey(id) },
        {
            $set: {
                name: req.body.name,
                section: req.body.section,
                price: req.body.price,
                vegetarian: req.body.vegetarian,
                vegan: req.body.vegan,
                createdby: req.body.createdby
            }
        }, { returnOriginal: false }, (err, result) => {
            if (err) {
                const error = new Error("Failed to update a record");
                error.status = 400;
                next(error);
            } else {
                res.header("Access-Control-Allow-Origin", "*");
                res.json(result);
            }
        });
}

/**
 * Deletes and returns the (newly deleted) first JSON object in the collection matching the ID specified in request URL path
 * 
 * @param req HTTP request body
 * @param res HTTP response body 
 * @returns Entree object or Error
 */
exports.deleteOne = function (req, res) {
    const id = req.params.id;
    db.getDB().collection(process.env.DB_COLLECTION).findOneAndDelete({ _id: db.getPrimaryKey(id) }, (err, result) => {
        if (err) {
            const error = new Error("Failed to delete a record");
            error.status = 400;
            next(error);
        } else
            res.json(result);
    });
}


exports.web_page_Get = function (req, res) {
   // res.json({msg: "hello"});
    res.render('../views/index');
}

exports.web_page_CreateOne = function (req, res) {
  //  const id = req.params.id;
    console.log(req.body);
    res.json({msg: "hello"});
}


exports.web_page_readAll = function (req, res) {
    db.getDB().collection(process.env.DB_COLLECTION).find({}).toArray((err, documents) => {
        if (err) {
            const error = new Error("Failed to read all records");
            error.status = 400;
            next(error);
        } else {

        //    let obj = JSON.parse(documents[0]);
            console.log(documents[0].name);
            /*
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(documents);

            var xsl = fs.readFileSync('../PaddysCafe.xsl', 'utf8');
            var stylesheet = xmlParse(xsl); //Parsing our XSL file
            var result = xsltProcess(xml, stylesheet); //Execute Transformation
            console.log(result);
*/
            res.header("Access-Control-Allow-Origin", "*");
            res.json(documents);
        }
    });
}

exports.web_page_DeleteOne = function (req, res) {
    const id = req.params.id;
    console.log(req.params);
    res.json({msg: "hello"});
}




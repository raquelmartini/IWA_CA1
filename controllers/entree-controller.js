/**
 * Contains route request handlers for the application
 * 
 * @author RMR
 * @version 1.0
 * @see entree-routes
 * @tutorial https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb - used this tutorial to learn how to add routes [Accessed: 22/4/20]
 */

const db = require('./db');
const Entree = require('../models/entree');

/************************************************************* WEB PAGE SPECIFIC  *************************************************************/

exports.renderIndex = function (req, res) {
    res.render('../views/index');
}

/************************************************************* CRUD  *************************************************************/

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
            createdby: req.body.createdby
        }
    );

    db.getDB().collection(process.env.DB_COLLECTION).insertOne(newEntree, (err, result) => {
        if (err) {
            //tested error code but it does not get called for some reason
            /*
            const error = new Error("Failed to update a record");
            error.status = 503;
            next(error);
            */
            return res.status(503).json({
                type: 'Database Error: Failed to create a record',
                message: err.message
            });
        } else {
            //had some CORS errors from POSTMAN and browser early in the development and added this
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        }
    });
}


/**
 * Reads and returns all the collection as an array of JSON objects
 * 
 * @param req HTTP request body
 * @param res HTTP response body 
 * @returns Array of newly Entree objects or Error
 */
exports.readAll = function (req, res) {
    db.getDB().collection(process.env.DB_COLLECTION).find({})
        .sort({ "section": 1, "price": -1 })
        .toArray((err, documents) => {
            if (err) {
                //tested error code but it does not get called for some reason
                /*
                const error = new Error("Failed to read records");
                error.status = 503;
                next(error);
                */
                return res.status(503).json({
                    type: 'Database Error: Failed to read records',
                    message: err.message
                });
            } else {
                //had some CORS errors from POSTMAN and browser early in the development and added this
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
            //tested error code but it does not get called for some reason
            /*
            const error = new Error("Failed to read a record");
            error.status = 503;
            next(error);
            */
            return res.status(503).json({
                type: 'Database Error: Failed to read a record',
                message: err.message
            });
        } else {
             //had some CORS errors from POSTMAN and browser early in the development and added this
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
                createdby: req.body.createdby
            }
        }, { returnOriginal: false }, (err, result) => {
            if (err) {
                //tested error code but it does not get called for some reason
                /*
                const error = new Error("Failed to update a record");
                error.status = 503;
                next(error);
                */
                return res.status(503).json({
                    type: 'Database Error: Failed to update a record',
                    message: err.message
                });
            } else {
                //had some CORS errors from POSTMAN and browser early in the development and added this
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
    const id = req.params.id || req.body.id;
    db.getDB().collection(process.env.DB_COLLECTION).findOneAndDelete({ _id: db.getPrimaryKey(id) }, (err, result) => {
        if (err) {
            //tested error code but it does not get called for some reason
            /*
            const error = new Error("Failed to delete a record");
            error.status = 503;
            next(error);
            */
            return res.status(503).json({
                type: 'Database Error: Failed to delete a record',
                message: err.message
            });
        } else
        {
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        }
    });
}


/**
 * Deletes multiple rows in the collection matching the IDs specified in request body
 * 
 * @param req HTTP request body
 * @param res HTTP response body 
 * @returns Entree object or Error
 */
exports.deleteMany = function (req, res) {

    if(req.body)
    {
        let ids = req.body.map(id => db.getPrimaryKey(id));
        db.getDB().collection(process.env.DB_COLLECTION).deleteMany({_id: { $in: ids}}, (err, result) => {
            if (err) {
                return res.status(503).json({
                    type: 'Database Error: Failed to delete a record',
                    message: err.message
                });
            } else
            {
                res.header("Access-Control-Allow-Origin", "*");
                res.json(result);
            }
        });
    }
}

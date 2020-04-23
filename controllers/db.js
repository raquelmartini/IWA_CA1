/**
 * Contains core DB methods including connect, getDB and getPrimaryKey
 * 
 * @author RMR
 * @version 1.0
 * @see server, .env, entree-controller
 * @tutorial https://www.youtube.com/watch?v=CyTWPr_WwdI - used this tutorial to learn how to connect to a db [Accessed: 21/4/20]
 */

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

//store the db connection if we call connect more than once
const state = {
  db: null,
};

/**
 * Connects the Mongo DB specified in the .env file
 * 
 * @param cb Callback function
 */
exports.connect = function (cb) {
  if (state.db) cb();
  else {
    MongoClient.connect(
      process.env.DB_CONNECTION,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) cb(err);
        else {
          state.db = client.db(process.env.DB_NAME);
          cb();
        }
      }
    );
  }
};

/**
 * Returns id used in read, delete and update
 * 
 * @param _id Entree object id
 * @returns ObjectID instance of the object with the _id specified
 */
exports.getPrimaryKey = function (_id) {
  return ObjectID(_id);
};


/**
 * Returns valid connection object to the Mongo DB
 * 
 * @returns Connection handler for the database
 */
exports.getDB = function () {
  return state.db;
};

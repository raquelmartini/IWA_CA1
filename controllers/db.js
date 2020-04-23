/*
 *
 *
 * @see https://www.youtube.com/watch?v=vjf774RKrLc [Accessed: 22/4/20]
 * @see https://www.youtube.com/watch?v=CyTWPr_WwdI [Accessed: 22/4/20]
 */

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const state = {
  db: null,
};

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

// returns id used in find and update
exports.getPrimaryKey = function (_id) {
  return ObjectID(_id);
};

//database connection
exports.getDB = function () {
  return state.db;
};

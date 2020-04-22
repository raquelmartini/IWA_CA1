const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;

const state = {
    db : null
};

exports.connect = function (callback){
    if(state.db)
        callback();
    else{
        MongoClient.connect(process.env.DB_CONNECTION, {useNewUrlParser : true, useUnifiedTopology: true}, (err,client)=>{
            if(err)
                callback(err);
            else{
                state.db = client.db(process.env.DB_NAME);
                callback();
            }
        });
    }
}

// returns id used in find and update 
exports.getPrimaryKey = function(id){
    return ObjectID(id);
}

//database connection 
exports.getDB = function(){
    return state.db;
}

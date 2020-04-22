const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;

const state = {
    db : null
};

const connect = (cb) =>{
    if(state.db)
        cb();
    else{
        MongoClient.connect(process.env.DB_CONNECTION, {useNewUrlParser : true, useUnifiedTopology: true}, (err,client)=>{
            if(err)
                cb(err);
            else{
                state.db = client.db(process.env.DB_NAME);
                cb();
            }
        });
    }
}

// returns id used in find and update 
const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

//database connection 
const getDB = ()=>{
    return state.db;
}

module.exports = {getDB,connect,getPrimaryKey};
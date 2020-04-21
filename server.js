logger = require("morgan");
cors = require("cors");
http = require("http");
express = require("express");
bodyParser = require("body-parser");
mongoose = require( 'mongoose');

var app = express();
var port = 3000;
var entreeCtrl = require('./entree-controller');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(require('./routes'));

app.get('/entrees', entreeCtrl.createEntree);

app.listen(port, function(err){
    console.log("Listening on port: " + port);
});

mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});


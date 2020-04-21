
var Entree = require('./models/entree');

exports.createEntree = function(req, res) { 
    var newentree = new Entree(req.body);
    newentree.save(function (err, user) {  //possible bug here
        if (err) { 
            console.log("error was received");
            res.status (400).json(err);
        }

        console.log("user was received");
        res.json(user); 
});
};
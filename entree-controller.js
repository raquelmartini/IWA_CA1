
var Entree = require('./models/entree');

exports.createEntree = function(req, res) { 
    var newentree = new Entree(req.body);
    newentree.save(function (err, user) {  //possible bug here
        if (err) { 
            res.status (400).json(err);
        }

        res.json(user); 
});
};
var mongoose = require('mongoose');

/*
* Learned about validation in Mongoose from this article
* https://code.tutsplus.com/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527
* Accessed: 22/4/20
*/
var entreeSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true,
        trim: true,
        lowercase: true
    },
    section: { 
        type: String, 
        required: true,
        trim: true,
        lowercase: true
    },
    price:{
        type: String,
        required: true,
        validate: {
            validator: function(number) {
                return number > 0;
            },
            message: 'Price must be a value greater than zero!'
        }
    },
    vegetarian:{ 
        type: Boolean, 
        default: false
    },
    vegan:{ 
        type: Boolean, 
        default: false
    },
    created: { 
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Entree', entreeSchema);
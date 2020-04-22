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
        lowercase: true,
        validate: {
            validator: function(text) {
                return text.length > 0;
            },
            message: 'Name must be a valid string with length > 0!'
        }
    },
    section: { 
        type: String, 
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(text) {
                return text.length > 0;
            },
            message: 'Section must be a valid string with length > 0!'
        }
    },
    price:{
        type: Number,
        required: true,
        min: 0.01,
        max: 10000,
        validate: {
            validator: function(number) {
                return number >= 0.01 && number <= 10000;
            },
            message: 'Price must be in a valid range i.e. [0.01 - 10000]!'
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
        default: Date.now()
    }
});

module.exports = mongoose.model('Entree', entreeSchema);
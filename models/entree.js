/**
 * Contains Mongoose OBM Schema for the Entree used in the application
 * 
 * @author RMR
 * @version 1.0
 * @see entree, entree-routes, db
 * @tutorial https://code.tutsplus.com/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527 - used this tutorial to learn validation in Mongoose [Accessed: 22/4/20]
 */
 
const mongoose = require('mongoose');

const EntreeSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true,
        trim: true,
        validate: {
            validator: function(text) {
                return text.length > 0;
            },
            message: 'Name must be a valid string with length > 0!'
        }
    },
    //["Yoy's Burgers", "Snack Attack", "Step to the Side", "Signature Shakes", "Classic Shakes"];
    section: { 
        type: Number,
        min: 0,
        max: 4,
        default: 0
    },
    price:{
        type: Number,
        required: true,
        min: 0.01,
        max: 1000000
    },
    vegetarian:{ 
        type: Boolean, 
        default: false
    },
    createdby:{
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    creationdate:{
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Entree', EntreeSchema);

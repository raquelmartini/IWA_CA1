var mongoose = require('mongoose');

var entreeSchema = new mongoose.Schema({ 
    name: { type: String, unique: true, lowercase: true},
    section: String,
    price: Number,
    vegetarian: Boolean
});

module.exports = mongoose.model('Entree', entreeSchema);
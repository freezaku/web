// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Dishes = require('../models/dishes');

//require('mongoose-currency').loadType(mongoose);
//var Currency = mongoose.Types.Currency;

// create a schema
var favoritesSchema = new Schema({
    dishes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Favorites = mongoose.model('Favorite', favoritesSchema);

// make this available to our Node applications
module.exports = Favorites;
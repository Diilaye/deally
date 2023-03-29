const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressModel = new Schema({

   

    point : {
        type: Schema.Types.ObjectId,
        ref: "point"
    },

    user : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    livraisonOrFactureOrEntrepot : {
        type: String,
        enum: ['livraison', 'facturation','entrepot'],
        default: 'livraison'
    },

    products : [{
        type: Schema.Types.ObjectId,
        ref :'product'
    }],

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('place', addressModel);
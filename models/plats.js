const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const PlatsModel = new Schema({

    user : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    restaurants : {
        type: Schema.Types.ObjectId,
        ref :'restaurant',
    },

    typeCuisine : {
        type: String,
        default : ""
    },

    imagesPlats: [{
        type: Schema.Types.ObjectId,
        ref :'media',
        default :  []
    }],

    complementPlats: [{
        type: String,
        default :  []
    }],

    description : {
        type : String
    },
    
    name : {
        type : String,
        unique  :  true
    },

    tempsDeCuisson : {
        type : String
    },


    price :  {
        type : String,
        default : '0'
    },

    nombreCommandes :  {
        type : String,
        default : '0'
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('plats', PlatsModel);
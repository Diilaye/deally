const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantModel = new Schema({

    adresse : {
        type: Schema.Types.ObjectId,
        ref: "place"
    },

    user : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    // platRestaurants : [{
    //     type: Schema.Types.ObjectId,
    //     ref :'plats',
    //     default : []
    // }],

    typeCuisine : [{
        type: String,
        default : []
    }],

    orders : [{
        type: Schema.Types.ObjectId,
        ref: "order",
        default : []
    }],

    ordersItems : [{
        type: Schema.Types.ObjectId,
        ref: "item-order",
        default :[]
    }],


    imagesGallerie: [{
        type: Schema.Types.ObjectId,
        ref :'media'
    }],

    logo: {
        type: Schema.Types.ObjectId,
        ref :'media'
    },

    description : {
        type : String
    },
    
    name : {
        type : String,
        unique  :  true
    },

    heureDebut : {
        type : String
    },


    heureFin : {
        type : String
    },

    soldeMTN: {
        type  : String ,
        default :'0'
    },

    soldeOrange: {
        type  : String ,
        default :'0'
    },


    soldeCash: {
        type  : String ,
        default :'0'
    },

    transactions : [{
        type: Schema.Types.ObjectId,
        ref: "transaction",
        default : []
    }],

    callFund : [{
        type: Schema.Types.ObjectId,
        ref: "callFund",
        default : []
    }],

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('restaurant', restaurantModel);
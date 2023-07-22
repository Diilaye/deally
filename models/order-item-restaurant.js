const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemOrdersRestaurantModel = new Schema({
    
    

    platOrder : {
        type: Schema.Types.ObjectId,
        ref :'plats'
    },

    complements : [{
        type: String,
        default : []
    }],

    order : {
        type: Schema.Types.ObjectId,
        ref :'order'
    },

    restaurant : {
        type: Schema.Types.ObjectId,
        ref :'restaurant'
    },

    client : {
        type: Schema.Types.ObjectId,
        ref :'users'
    },

    livreurs : {
        type: Schema.Types.ObjectId,
        ref :'users'
    },

    livraison : {
        type: Schema.Types.ObjectId,
        ref :'place'
    },

    reference : {
        type : String,
        default :''
    },

    referencePay : {
        type : String,
        default :''
    },

    statusShop : {
        type: String,
        enum: ['CREATE' ,'ACCEPT', 'PREPARING','DEBUT_TRANSPORT','TRANSPORT','DELIVERY','PAY' ,'REPAY','FINISHED','FAILED'],
        default: 'CREATE'
    },


    typePaiment : {
        type: String,
        enum: ['espece', 'om','mtn' , "wallet",'micro','bank' ],
        default: 'espece'
    },


    statusClient : {
        type: String,
        enum: ['PANNIER','CREATE','FAILED' , 'PAY',"REPAY"],
        default: 'PANNIER'
    },

    statusPickup : {
        type: String,
        enum: ['place','livraison'],
        default: 'place'
    },

    quantite : {
        type : Number
    },

    priceTotal : {
        type : Number
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('item-order-restaurant', itemOrdersRestaurantModel) ;
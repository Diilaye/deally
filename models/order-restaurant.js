const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderRestaurantModel = new Schema({

    items: [ {
        type: Schema.Types.ObjectId,
        ref: "item-order-restaurant"
    }],

    price : {
        type : Number
    },


    priceLivraison : {
        type : Number,
        default :  0
    },

    status: {
        type: String,
        enum : ['PENDING','FAILED' ,'COMPLETED'],
        default: 'PENDING'
    },

    livraison : {
        type: Schema.Types.ObjectId,
        ref :'place'
    },

    someoneElse : {
        type: Schema.Types.ObjectId,
        ref :'someone-else'
    },


    typePaiment : {
        type: String,
        enum: ['espece', 'om','mtn' , "wallet",'paypal' ],
        default: 'espece'
    },

    typeLivraison : {
        type : String,
        enum: ['0','1'],
        default: '0' // 0  => "sur  place" ,  "1" => Livraison
    },

    reference : {
        type : String,
        default :''
    },

    client : {
        type: Schema.Types.ObjectId,
        ref :'users'
    },
 
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('order-restaurant', orderRestaurantModel);
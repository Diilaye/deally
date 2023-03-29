const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderModel = new Schema({

    items: [ {
        type: Schema.Types.ObjectId,
        ref: "item-order"
    }],

    price : {
        type : Number
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
    typePaiment : {
        type: String,
        enum: ['espece', 'om','mtn' , "wallet",'micro','bank' ],
        default: 'espece'
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

module.exports = mongoose.model('order', orderModel);
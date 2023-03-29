const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemOrdersModel = new Schema({
    
    

    product : {
        type: Schema.Types.ObjectId,
        ref :'product'
    },

    order : {
        type: Schema.Types.ObjectId,
        ref :'order'
    },

    shop : {
        type: Schema.Types.ObjectId,
        ref :'shop'
    },

    client : {
        type: Schema.Types.ObjectId,
        ref :'client'
    },

    livraison : {
        type: Schema.Types.ObjectId,
        ref :'place'
    },

    usine : {
        type: Schema.Types.ObjectId,
        ref :'users',
        default :undefined
    },

    reference : {
        type : String,
        default :''
    },

    referencePay : {
        type : String,
        default :''
    },

    preparating_pourcentage:{
        type:Number,
        default :50
    },

    statusShop : {
        type: String,
        enum: ['CREATE' ,'ACCEPT', 'PREPARING','DEBUT_TRANSPORT','TRANSPORT','DELIVERY','PAY' ,'REPAY','FINISHED',"MICRO",'FAILED'],
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

module.exports = mongoose.model('item-order', itemOrdersModel) ;
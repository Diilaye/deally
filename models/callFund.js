const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CallFund = new Schema({

    description: {
        type: String,
    },

    user_treat: {
        type: Schema.Types.ObjectId,
        ref: "admin"
    },

    shop : {
        type: Schema.Types.ObjectId,
        ref: "shop"
    },

    paiement_method_type : {
        type: String,
        enum: ['banque', 'cheque','orange-money','wave'],
        default: 'orange-money'
    },

    paiement_type : {
        type: String,
        enum: ['payback', 'callfund'],
        default: 'callfund'
    },

    reference : {
        type: String,
        unique : true ,
        required : true
    },

    number_bank : {
        type :  String,
    },

    number_phone : {
        type :  String,

    },

    price : {
        type : String
    },

    is_treat: {
        type: String,
        enum: ['paid', 'canceled' , 'refunded' , 'nothing'],
        default: 'nothing'
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('callFund', CallFund);
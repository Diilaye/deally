const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionModel = new Schema({
    
    reference: {
        type: String 
    },

    amount : {
        type : String
    },

    token : {
        type : String
    },

    order : {
        type: Schema.Types.ObjectId,
        ref: "order"
    },

    client : {
        type: Schema.Types.ObjectId,
        ref: "client"
    },
    
    status: {
        type: String,
        enum: ['PENDING', 'SUCCESS','CANCELED'],
        default: 'PENDING'
    },

    date: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('transactions', transactionModel) ;
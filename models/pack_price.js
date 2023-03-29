const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PackModel = new Schema({

    user : {
        type: Schema.Types.ObjectId,
        ref :'users'
    },

    min : {
        type: Number,
    },

    max : {
        type: Number,
    },

    price : {
        type: Number,
    },
  
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('pack_price', PackModel) ;
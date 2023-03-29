const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postModel = new Schema({
    
    images: [{
        type: Schema.Types.ObjectId,
        ref :'media'
    }],

    name : {
        type: String,
        required : true,
        unique : true
    },

    pack_price  : [{
        type: Schema.Types.ObjectId,
        ref :'pack_price' 
    }],

    category : {
        type: Schema.Types.ObjectId,
        ref :'categorie'
    },

    shop : {
        type: Schema.Types.ObjectId,
        ref :'shop'
    },

    description : {
        type : String
    },

    contry : {
        type : String
    },

    address : {
        type: Schema.Types.ObjectId,
        ref :'place'
    },

    condition_concervation : {
        type : String
    },
    
    stock : {
        type: String
    },

    unite_per_pack : {
        type : Number ,
        default : 12
    },

    pack_per_pallete : {
        type : Number,
        default : 10
    },


    ranking : {
        type : Number,
        default : 5
    },

    publish_date: {
        type: Date,
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('product', postModel) ;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorieModel = new Schema({

    title: {
        type: String,
        unique : true , 
        required : true
    },

    tiltleFrench : {
        type: String,
            unique : true , 
            required : true
    },

    parent : {
        type: Schema.Types.ObjectId,
        ref: "categorie"
    },

    image : {
        type: Schema.Types.ObjectId,
        ref: "media"
    },

    user_created : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    contries : [{
        type: String,
        default :[]
    }],

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('categorie', categorieModel);
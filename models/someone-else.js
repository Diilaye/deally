const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeoneElseModel = new Schema({

    nom : {
        type: String,
    },

    prenom : {
        type: String,
    },

    phone : {
        type: String,
    },

    photo : {
        type: Schema.Types.ObjectId,
        ref :'media'
    },
  
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('someone-else', SomeoneElseModel) ;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeoneElseModel = new Schema({

    nom : {
        type: String,
    },

   

    phone : {
        type: String,
    },
  
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('someone-else', SomeoneElseModel) ;
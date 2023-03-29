const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PointModel = new Schema({

    lat : {
        type: String,
    },

    long : {
        type: String,
    },

    name  : {
        type: String,
    },
  
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('point', PointModel) ;
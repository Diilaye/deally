const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileModel = new Schema({

    user : {
        type: Schema.Types.ObjectId,
        ref :'users'
    },

    url : {
        type: String,
    },
  
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('media', FileModel) ;
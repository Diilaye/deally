const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commercantModel = new Schema({
    
    phone: {
        type: String,
        required : true,
        unique : true
    },

    email: {
        type: String,
    },

    password: {
        type: String,
    },

    passwords : {
        type : Array
    },

    token : {
        type : String,
        default : ""
    },


    notification  : {
        type : Boolean,
        default :false
    },

    contry : {
        type : String,
        default :"NG"
    },

    city : {
        type : String,
    },

    address : [ {
        type: Schema.Types.ObjectId,
        ref: "place"
    }],


    orders : [{
        type: Schema.Types.ObjectId,
        ref: "order"
    }],

    transactions : [{
        type: Schema.Types.ObjectId,
        ref: "transaction"
    }],


    reports : [{
        type: Schema.Types.ObjectId,
        ref: "report"
    }],

    isNewShop : {
        type : Boolean,
        default : true
    },
   

    date: {
        type: Date,
        default: Date.now()
    }
},{
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.passwords;
        delete  ret.token;
        delete ret.__v;
      },
    },
  });

module.exports = mongoose.model('commercant', commercantModel) ;
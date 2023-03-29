const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShopProfileModel = new Schema({
    
    phone: {
        type: String,
        required : true,
        unique : true
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

    description : {
        type: String,
        default :""
    },

    avatar : {
        type: Schema.Types.ObjectId,
        ref: "file"
    },
    
    cover : {
        type: Schema.Types.ObjectId,
        ref: "file"
    },

    nameShop : {
        type: String,
        required : true,
        unique : true
    },

    slogan  : {
        type : String,
        default :""
    },

    contry : {
        type : String,
        default :"NG"
    },

    address : [{
        type: Schema.Types.ObjectId,
        ref: "place"
    }],

     
    products : [{
        type: Schema.Types.ObjectId,
        ref: "products"
    }],
    
    orders : [{
        type: Schema.Types.ObjectId,
        ref: "order"
    }],

    transactions : [{
        type: Schema.Types.ObjectId,
        ref: "transaction"
    }],

    isNewShop : {
        type : Boolean,
        default : true
    },

    solde: {
        type  : String ,
        default :'0'
    },

    callFund : [{
        type: Schema.Types.ObjectId,
        ref: "callFund",
        default : []
    }],

    date: {
        type: Date,
        default: Date.now()
    }
}, {
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

module.exports = mongoose.model('fournisseur', ShopProfileModel) ;
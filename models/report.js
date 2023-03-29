const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReportModel = new Schema({

    description: {
        type: String,
    },

    user_alert: {
        type: Schema.Types.ObjectId,
        ref: "client"
    },

    shop_alerted : {
        type: Schema.Types.ObjectId,
        ref: "shop"
    },

    product_alerted : {
        type: Schema.Types.ObjectId,
        ref: "shop"
    },


    is_treat: {
        type: Boolean,
        default: false
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('report', ReportModel);